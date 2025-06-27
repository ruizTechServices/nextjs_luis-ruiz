
import openai from "../../../../lib/utils/openai/connection";
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { instructions, assistantName, modelName } = await req.json();

    if (!instructions) {
        return NextResponse.json({ error: "Provide your assistant with instructions." }, { status: 400 });
    }
    if (!assistantName) {
        return NextResponse.json({ error: "Provide a name for your assistant." }, { status: 400 });
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
        return NextResponse.json(myAssistant);
    } catch (error) {
        // Handle errors appropriately
        console.error("Error creating the assistant:", error);
        return NextResponse.json({ error: "Failed to create the assistant" }, { status: 500 });
    }
}
