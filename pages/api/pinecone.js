// pages/api/pinecone.js
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

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
const index = pinecone.index('personal-assistant');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      throw new Error('Prompt is required and was not provided.');
    }

    // Generate embedding from OpenAI
    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-3-small",
      input: prompt,
    });

    if (!embeddingResponse.data || !embeddingResponse.data.data[0].embedding) {
      throw new Error('Failed to generate embedding');
    }

    const embedding = embeddingResponse.data.data[0].embedding;

    // Query Pinecone with the embedding
    const queryResults = await index.query({
      vector: embedding,
      topK: 3
    });

    res.status(200).json(queryResults);
  } catch (error) {
    console.error('Error in personalAssistant API:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
