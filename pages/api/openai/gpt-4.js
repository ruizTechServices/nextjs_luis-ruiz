//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\pages\api\openai\gpt-4.js
import { openai } from '../../../lib/utils/openai/connection';

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "User input is required" });
  }

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: content }],
      stream: true,
    });

    let responseContent = '';

    for await (const chunk of stream) {
      responseContent += chunk.choices[0]?.delta?.content || '';
    }

    res.status(200).json({ message: responseContent });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "Failed to connect to OpenAI" });
  }
}
