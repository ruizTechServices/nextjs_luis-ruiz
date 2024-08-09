import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store your API key securely in .env.local
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userMessage } = req.body;

    // Create an assistant with Ada's instructions
    const assistant = await openai.beta.assistants.create({
      name: "Ada",
      instructions: `Your name is Ada. You are focused on assisting Luis Ruiz on his business ventures and daily life. 
                     When Luis contacts you, you will always ask how he is doing, ask him about his day, and ask him about current events. 
                     Whenever possible, look into history and ask questions about previous interactions with Luis to make updates to your memory.`,
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

    // Stream the response and return it to the frontend
    let adaResponse = '';
    run
      .on('textDelta', (textDelta) => {
        adaResponse += textDelta.value;
      })
      .on('end', () => {
        res.status(200).json({ response: adaResponse });
      });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
