//pages/api/hugging_face/chat.js
import Together from "together-ai";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

    try {
      const response = await together.chat.completions.create({
        messages: req.body.messages,
        model: "mistralai/Mixtral-8x22B-Instruct-v0.1",
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        stop: ["</s>", "[/INST]"],
        stream: true,
      });

      res.status(200).json({ content: response.choices[0].message.content });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "An error occurred while processing your request." });
    }
  } else {
    // Respond with a 405 if the method is not POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
