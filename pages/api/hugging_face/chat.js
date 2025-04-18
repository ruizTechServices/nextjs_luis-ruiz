//pages/api/hugging_face/chat.js
import Together from 'together-ai';

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

const stream = await together.chat.completions.create({
  model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
  messages: [
    { role: 'user', content: req.body.messages },
  ],
  stream: true,
});

for await (const chunk of stream) {
  // use process.stdout.write instead of console.log to avoid newlines
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}