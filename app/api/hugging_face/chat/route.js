
import Together from 'together-ai';
import { StreamingTextResponse } from 'ai';

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

export async function POST(req) {
  const { messages } = await req.json();

  const stream = await together.chat.completions.create({
    model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
    messages,
    stream: true,
  });

  const textStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          controller.enqueue(content);
        }
      }
      controller.close();
    },
  });

  return new StreamingTextResponse(textStream);
}
