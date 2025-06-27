
import openai from "../../../../lib/utils/openai/connection";
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "User input is required" }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });
    return NextResponse.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return NextResponse.json({ error: "Failed to connect to OpenAI" }, { status: 500 });
  }
}
