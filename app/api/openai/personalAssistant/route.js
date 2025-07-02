
import OpenAI from "openai";
import { Pinecone } from '@pinecone-database/pinecone';
import NodeCache from "node-cache";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// Initialize OpenAI with the provided API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Pinecone with the provided API key and set up the index
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pinecone.index('personal-assistant');

// Initialize in-memory cache with specified TTL and check period
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// Function to search for relevant vectors using Pinecone
async function searchVectors(query, topK = 5) {
  // Generate query embedding using OpenAI
  const queryEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query
  });

  // Search the Pinecone index for similar embeddings
  const results = await index.namespace('ns1').query({
    vector: queryEmbedding.data[0].embedding,
    topK: topK,
    includeMetadata: true
  });

  // Return the relevant texts from the results
  return results.matches.map(match => match.metadata.text);
}

// The main API handler function
export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const { prompt, conversationHistory = [] } = await req.json();

    // Check cache for a previous response with the same conversation history and prompt
    const cacheKey = JSON.stringify(conversationHistory.concat(prompt));
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      return NextResponse.json({ message: cachedResponse });
    }

    // Search for relevant texts using the query prompt
    const relevantTexts = await searchVectors(prompt);

    // Construct the prompt messages for the chat completion request
    const messages = [
      { role: "system", content: "Your name is Ada. You are focused on assisting Luis Ruiz on his business ventures and daily life. When Luis contacts you, you will always ask how he is doing, ask him about his day, and ask him about current events. Whenever possible, look into history and ask questions about previous interactions with Luis to make updates to your memory.  Use the following relevant information if it's helpful: " + relevantTexts.join(" ") },
      ...conversationHistory.map((msg, index) => ({
        role: index % 2 === 0 ? "user" : "assistant",
        content: msg
      })),
      { role: "user", content: prompt }
    ];

    // Create chat completion using OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      user: userId,
    });

    // Extract the assistant's response from the completion result
    const responseMessage = completion.choices[0].message.content;

    // Generate embeddings for both the prompt and the response message
    const embeddings = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: [prompt, responseMessage]
    });

    // Prepare the vectors for upserting into Pinecone
    const vectors = embeddings.data.map((embedding, index) => ({
      id: `message_${index}_${Date.now()}`,
      values: embedding.embedding,
      metadata: {
        text: index === 0 ? prompt : responseMessage,
        role: index === 0 ? "user" : "assistant"
      }
    }));

    // Upsert the vectors into the Pinecone index
    await index.namespace('ns1').upsert(vectors);

    // Cache the response to optimize future requests
    cache.set(cacheKey, responseMessage);

    // Send the assistant's response back to the client
    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error("Error in API handler:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
