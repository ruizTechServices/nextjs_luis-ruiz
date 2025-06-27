
import MistralClient from '@mistralai/mistralai';
import { NextResponse } from 'next/server';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new MistralClient(apiKey);

export async function POST(req) {
  try {
    const { input } = await req.json();

    if (!input || !Array.isArray(input)) {
      return NextResponse.json({ error: 'Input is required and must be an array of strings.' }, { status: 400 });
    }

    const embeddingsResponse = await client.embeddings({
      model: 'mistral-embed',
      input: input,
    });

    return NextResponse.json(embeddingsResponse);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
  }
}
