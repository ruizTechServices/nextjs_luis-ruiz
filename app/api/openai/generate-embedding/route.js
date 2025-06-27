
import openai from "../../../../lib/utils/openai/connection";
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { text } = await req.json();
  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
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

    return NextResponse.json({ embedding });
  } catch (error) {
    console.error("Error generating embedding:", error);
    return NextResponse.json({ error: "Failed to generate embedding" }, { status: 500 });
  }
}
