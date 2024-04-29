//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\lib\utils\openai\connection.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.PROJECT_ID,
});


export default openai ;
