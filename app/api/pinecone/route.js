
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

// Configuration for Pinecone client with API key
const pineconeConfig = {
  apiKey: process.env.PINECONE_API_KEY,
};

// Create Pinecone client and specify the index to use
const pinecone = new Pinecone(pineconeConfig);
const index = pinecone.index('chat-history');

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      throw new Error('Prompt is required and was not provided.');
    }

    // Generate embedding from OpenAI
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: prompt,
    });

    if (!embeddingResponse.data || !embeddingResponse.data[0].embedding) {
      throw new Error('Failed to generate embedding');
    }

    const embedding = embeddingResponse.data[0].embedding;

    // Query Pinecone with the embedding
    const queryResults = await index.query({
      vector: embedding,
      topK: 3
    });

    return NextResponse.json(queryResults);
  } catch (error) {
    console.error('Error in personalAssistant API:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
