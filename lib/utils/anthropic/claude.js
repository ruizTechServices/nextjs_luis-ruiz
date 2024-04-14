//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\lib\utils\anthropic\claude.js
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default anthropic;