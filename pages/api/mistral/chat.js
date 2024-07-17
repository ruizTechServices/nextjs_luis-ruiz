// pages/api/chat.js
import MistralClient from "@mistralai/mistralai";

const apiKey =
  process.env.MISTRAL_API_KEY || "DVwykfTrlqnAkLnpFmn3ejhg1QoVi8gT";
const client = new MistralClient(apiKey);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    const chatResponse = await client.chat({
      model: "mistral-large-latest",
      messages: [{ role: "user", content: message }],
    });

    const botMessage = chatResponse.choices[0].message.content;
    res.status(200).json({ message: botMessage });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}
