import openai from "../../../../lib/utils/openai/connection";
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "User input is required" }, { status: 400 });
    }

    // Input validation for public endpoint
    if (prompt.length > 1000) {
      return NextResponse.json({ error: "Message too long. Maximum 1000 characters allowed." }, { status: 400 });
    }

    // Basic rate limiting check (simple implementation)
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      return NextResponse.json({ error: "Empty message not allowed" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant for Luis Ruiz\'s website. Be friendly, professional, and helpful. Keep responses concise and relevant.'
        },
        {
          role: 'user', 
          content: trimmedPrompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const message = completion.choices[0].message.content;
    return NextResponse.json({ message });

  } catch (error) {
    console.error('Error in public chat API:', error);
    return NextResponse.json({ 
      error: "Sorry, I'm having trouble responding right now. Please try again." 
    }, { status: 500 });
  }
}
