// pages/api/openai/generate-embedding.js
import openai from '../../../lib/utils/openai/connection';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });

    const embedding = embeddingResponse.data?.[0]?.embedding;
    if (!embedding) {
      throw new Error("Failed to generate embedding");
    }

    res.status(200).json({ embedding });
  } catch (error) {
    console.error("Error generating embedding:", error);
    res.status(500).json({ error: "Failed to generate embedding" });
  }
}