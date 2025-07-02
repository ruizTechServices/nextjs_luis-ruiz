import Together from 'together-ai';
import { auth } from '@clerk/nextjs/server';

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { messages } = await req.json();

  const response = await together.chat.completions.create({
    messages,
    model: 'meta-llama/Llama-2-7b-chat-hf',
    stream: true,
  });

  const textStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          controller.enqueue(content);
        }
      }
      controller.close();
    },
  });

  return new Response(textStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
