import openai from '../../../lib/utils/openai/connection';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { input } = req.body;

  if (!input) {
    res.status(400).json({ error: "Input text is required" });
    return;
  }

  try {
    // Generate the embedding using OpenAI
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: input,
    });

    const vector = embeddingResponse.data[0].embedding;

    if (!vector) {
      throw new Error('Failed to generate embedding');
    }

    res.status(200).json({ vector });
  } catch (error) {
    console.error("Error generating embedding:", error);
    res.status(500).json({ error: "Failed to generate embedding" });
  }
}
