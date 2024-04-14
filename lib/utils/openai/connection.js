//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\lib\utils\openai\connection.js
import { OpenAI } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const connection = async (prompt) => {
  try {
    const response = await openai.createCompletion("gpt-3.5-turbo", {
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error connecting to OpenAI:", error);
    throw error;
  }
};
