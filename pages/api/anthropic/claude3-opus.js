//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\pages\api\anthropic\claude3-opus.js
import anthropic from "../../../lib/utils/anthropic/claude";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userInput = req.body.input;  // Assuming user input is sent as 'input' in the request body

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
      res.status(200).json(msg);  // Send the API response back to the client

    } catch (error) {
      console.error("Failed to fetch response from Anthropic API:", error);
      res.status(500).json({ error: "Error communicating with Anthropic API" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
