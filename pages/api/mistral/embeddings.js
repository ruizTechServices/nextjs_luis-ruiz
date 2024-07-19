import MistralClient from "@mistralai/mistralai";

const apiKey = process.env.MISTRAL_API_KEY;

const client = new MistralClient(apiKey);

const embeddingsResponse = await client.embeddings({
  model: 'mistral-embed',
  input: ["Embed this sentence.", "As well as this one."],
});

console.log(embeddingsResponse);