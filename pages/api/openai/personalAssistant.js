// pages/api/openai/personalAssistant.js
import { Configuration, OpenAIApi } from "openai";
import { Pinecone } from '@pinecone-database/pinecone';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pinecone.index('personal-assistant');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;

      // Create Chat Completion
      const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        user: "user_id",  // replace with actual user identifier
      });

      const responseMessage = completion.data.choices[0].message.content;

      // Generate Embeddings
      const embeddings = await openai.createEmbedding({
        model: "text-embedding-ada-002",
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
