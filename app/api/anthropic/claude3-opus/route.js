
import anthropic from "../../../../lib/utils/anthropic/claude";
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { input: userInput } = await req.json();

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0,
      system: "You are Claude 3 Opus, the most intelligent AI in the world.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userInput
            }
          ]
        }
      ]
    });

    console.log(msg);  // Log the response from Anthropic API
    return NextResponse.json(msg);

  } catch (error) {
    console.error("Failed to fetch response from Anthropic API:", error);
    return NextResponse.json({ error: "Error communicating with Anthropic API" }, { status: 500 });
  }
}
