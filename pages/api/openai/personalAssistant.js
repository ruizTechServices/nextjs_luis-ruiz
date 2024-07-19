// pages/api/openai/personalAssistant.js
import OpenAI from "openai";
import { Pinecone } from '@pinecone-database/pinecone';
import NodeCache from "node-cache";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pinecone.index('personal-assistant');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

async function searchVectors(query, topK = 5) {
  const queryEmbedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: query
  });

  const results = await index.namespace('ns1').query({
    vector: queryEmbedding.data[0].embedding,
    topK: topK,
    includeMetadata: true
  });

  return results.matches.map(match => match.metadata.text);
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { prompt, conversationHistory = [] } = req.body;

      // Check cache
      const cacheKey = JSON.stringify(conversationHistory.concat(prompt));
      const cachedResponse = cache.get(cacheKey);
      if (cachedResponse) {
        return res.status(200).json({ message: cachedResponse });
      }

      // Search for relevant vectors
      const relevantTexts = await searchVectors(prompt);

      // Construct messages for chat completion
      const messages = [
        { role: "system", content: "You are a personal assistant. Use the following relevant information if it's helpful: " + relevantTexts.join(" ") },
        ...conversationHistory.map((msg, index) => ({
          role: index % 2 === 0 ? "user" : "assistant",
          content: msg
        })),
        { role: "user", content: prompt }
      ];

      // Create Chat Completion
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages,
        user: "user_id",  // replace with actual user identifier
      });

      const responseMessage = completion.choices[0].message.content;

      // Generate Embeddings
      const embeddings = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: [prompt, responseMessage]
      });

      // Save Embeddings to Pinecone
      const vectors = embeddings.data.map((embedding, index) => ({
        id: `message_${index}_${Date.now()}`,
        values: embedding.embedding,
        metadata: {
          text: index === 0 ? prompt : responseMessage,
          role: index === 0 ? "user" : "assistant"
        }
      }));

      await index.namespace('ns1').upsert(vectors);

      // Cache the response
      cache.set(cacheKey, responseMessage);

      res.status(200).json({ message: responseMessage });
    } catch (error) {
      console.error("Error in API handler:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}