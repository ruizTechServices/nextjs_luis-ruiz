// pages/api/openai/gpt-4o_mini.js
import openai from '../../../lib/utils/openai/connection';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { prompt, context } = req.body;
  if (!prompt) {
    res.status(400).json({ error: "User input is required" });
    return;
  }

  try {
    const messages = [
      { role: 'system', content: 'You are a helpful assistant. Use the following context to inform your responses, but do not directly quote it unless asked: ' + context },
      { role: 'user', content: prompt }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', 
      messages: messages,
    });

    res.status(200).json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "Failed to connect to OpenAI" });
  }
}