
import openai from "../../../../lib/utils/openai/connection";
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { input } = await req.json();

  if (!input) {
    return NextResponse.json({ error: "Input text is required" }, { status: 400 });
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

    return NextResponse.json({ vector });
  } catch (error) {
    console.error("Error generating embedding:", error);
    return NextResponse.json({ error: "Failed to generate embedding" }, { status: 500 });
  }
}
