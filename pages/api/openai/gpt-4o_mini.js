// pages/api/openai/gpt-4o_mini.js
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt, chatId } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // 1. Generate an embedding for the input prompt
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: prompt,
    });
    const promptEmbedding = embeddingResponse.data[0].embedding;

    // 2. Use the embedding to find similar messages in the database
    const { data: similarMessages, error: matchError } = await supabase.rpc('match_chat_messages', {
      query_embedding: promptEmbedding,
      match_threshold: 0.7, // Adjust this threshold as needed
      max_results: 5 // Adjust the number of results as needed
    });

    if (matchError) {
      throw new Error(`Error matching similar messages: ${matchError.message}`);
    }

    // 3. Use the similar messages as context for the GPT-4 model
    const context = similarMessages.map(msg => msg.message).join("\n");

    // 4. Generate a response using the GPT-4 model
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4-turbo-preview" if available
      messages: [
        { role: "system", content: "You are a helpful assistant. Use the following context to inform your responses, but do not directly quote it unless asked:" + context },
        { role: "user", content: prompt }
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    // 5. Generate an embedding for the response
    const responseEmbeddingResult = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: aiResponse,
    });
    const responseEmbedding = responseEmbeddingResult.data[0].embedding;

    // Store the user's message and the AI's response in the database
    const { error: insertError } = await supabase.from('chats').insert([
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
    res.status(200).json({ message: aiResponse });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}