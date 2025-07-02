import { OpenAI } from 'openai';
import { createClient } from '../../../../lib/utils/supabase/supabaseClient';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient();

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { prompt, chatId } = await req.json();

  if (!prompt || !chatId) {
    return NextResponse.json({ error: "Prompt and chatId are required" }, { status: 400 });
  }

  try {
    // 1. Generate an embedding for the input prompt
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: prompt,
    });
    const promptEmbedding = embeddingResponse.data?.[0]?.embedding;

    if (!promptEmbedding) {
      throw new Error("Failed to generate embedding for the prompt");
    }

    // 2. Use the embedding to find similar messages in the database
    const { data: similarMessages, error: matchError } = await supabase.rpc('match_chat_messages', {
      query_embedding: promptEmbedding,
      match_threshold: 0.7,
      max_results: 5
    });

    if (matchError) {
      throw new Error(`Error matching similar messages: ${matchError.message}`);
    }

    // 3. Use the similar messages as context for the GPT-4 model
    const context = similarMessages.map(msg => msg.message).join("\n");

    // 4. Generate a response using the GPT-4 model
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Use the correct model identifier
      messages: [
        { role: "system", content: "You are a helpful assistant. Use the following context to inform your responses, but do not directly quote it unless asked:\n" + context },
        { role: "user", content: prompt }
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    // 5. Generate an embedding for the response
    const responseEmbeddingResult = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: aiResponse,
    });
    const responseEmbedding = responseEmbeddingResult.data?.[0]?.embedding;

    if (!responseEmbedding) {
      throw new Error("Failed to generate embedding for the response");
    }

    // Store the user's message and the AI's response in the database
    const { error: insertError } = await supabase.from('chat_messages').insert([
      {
        chat_id: chatId,
        message: prompt,
        embedding: promptEmbedding,
        created_at: new Date().toISOString(),
      },
      {
        chat_id: chatId,
        message: aiResponse,
        embedding: responseEmbedding,
        created_at: new Date().toISOString(),
      }
    ]);

    if (insertError) {
      throw new Error(`Error inserting messages: ${insertError.message}`);
    }

    // 6. Return the response to the client
    return NextResponse.json({ message: aiResponse });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}