//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\pages\api\openai\gpt-4.js
import { openai } from '../../../lib/utils/openai/connection';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { content } = req.body;
  if (!content) {
    res.status(400).json({ error: "User input is required" });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: content }],
    });
    res.status(200).json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "Failed to connect to OpenAI" });
  }
}
