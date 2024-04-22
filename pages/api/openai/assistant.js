//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\pages\api\openai\assistant.js
import { openai } from '../../../lib/utils/openai/connection';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
      });

      // Log the entire response to see the structure
      console.log("OpenAI API Response:", JSON.stringify(response, null, 2));

      // Safely access the choices and check if they exist
      if (response && response.data && response.data.choices && response.data.choices.length > 0) {
        const messageText = response.data.choices[0].message.content;
        res.status(200).json({ messageText: messageText });
      } else {
        console.error("Unexpected API response structure:", JSON.stringify(response, null, 2));
        res.status(500).json({ message: "Unexpected API response structure" });
      }
    } catch (error) {
      console.error("API call error:", error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
