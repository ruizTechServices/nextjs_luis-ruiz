//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\pages\api\openai\createAssistant.js
import openai from "../../../lib/utils/openai/connection";

export default async function handler(req, res) {
    // Ensure the method is POST
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ error: "Method Not Allowed" });
        return;
    }

    const instructions = req.body.instructions;
    const assistantName = req.body.assistantName;
  const modelName = req.body.modelName;

    if (!instructions) {
        res.status(400).json({ error: "Provide your assistant with instructions." });
        return;
    }
    if (!assistantName) {
        res.status(400).json({ error: "Provide a name for your assistant." });
        return;
    }

    try {
        // Create the assistant
        const myAssistant = await openai.beta.assistants.create({
            instructions: instructions,
            name: assistantName,
            tools: [{ type: "code_interpreter" }],
            model: modelName,
        });

        // Log the assistant's details to the console and send a response
        console.log(myAssistant);
        res.status(200).json(myAssistant);
    } catch (error) {
        // Handle errors appropriately
        console.error("Error creating the assistant:", error);
        res.status(500).json({ error: "Failed to create the assistant" });
    }
}
