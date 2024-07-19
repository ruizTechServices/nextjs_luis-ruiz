//pages/api/pinecone.js
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

const pineconeConfig = {
  apiKey: process.env.PINECONE_API_KEY, 
};

const pinecone = new Pinecone(pineconeConfig);
const index = pinecone.index('personal-assistant');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    // Generate embedding from OpenAI
    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: prompt,
    });

    const embedding = embeddingResponse.data.data[0].embedding;

    // Query Pinecone with the embedding
    const queryResults = await index.query({
      vector: embedding,
      topK: 3
    });

    res.status(200).json(queryResults);
  } catch (error) {
    console.error('Error in personalAssistant API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
