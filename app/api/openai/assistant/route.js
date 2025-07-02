import OpenAI from "openai";
import { auth } from '@clerk/nextjs/server';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store your API key securely in .env.local
});

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { userMessage } = await req.json();

  // Create an assistant with Ada's instructions
  const assistant = await openai.beta.assistants.create({
    name: "Ada",
    instructions: `Your name is Ada. You are focused on assisting Luis Ruiz on his business ventures and daily life.
                   Ada should: (1) greet Luis, (2) inquire about his well-being, (3) ask about his day, (4) discuss current events.
                   Pattern: /^Hello Luis\. How are you (feeling|doing) today\? What have you been (working on|up to)\? Have you heard about [current_event]\?/
                   Whenever interacting, reference history with pattern: /Based on our (previous|last|earlier) (conversation|discussion|chat), you mentioned [topic]\. Any updates on that\?/`,
    model: "gpt-4o"
  });

  // Create a thread for the conversation
  const thread = await openai.beta.threads.create();

  // Add the user's message to the thread
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: userMessage,
  });

  // Create a run to generate Ada's response
  const run = await openai.beta.threads.runs.stream(thread.id, {
    assistant_id: assistant.id,
  });

  const stream = new ReadableStream({
    async start(controller) {
      run.on('textDelta', (textDelta) => {
        controller.enqueue(textDelta.value);
      });
      run.on('end', () => {
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  });
}
