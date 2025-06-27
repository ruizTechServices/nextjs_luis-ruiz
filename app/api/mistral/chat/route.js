
import MistralClient from '@mistralai/mistralai';
import { NextResponse } from 'next/server';

const apiKey = process.env.MISTRAL_API_KEY || 'DVwykfTrlqnAkLnpFmn3ejhg1QoVi8gT';
const client = new MistralClient(apiKey);

export async function POST(req) {
  try {
    const { message } = await req.json();
    const chatResponse = await client.chat({
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: message }],
    });

    const botMessage = chatResponse.choices[0].message.content;
    return NextResponse.json({ message: botMessage });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
  }
}
