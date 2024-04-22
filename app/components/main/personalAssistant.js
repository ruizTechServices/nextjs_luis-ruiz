// C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\components\main\personalAssistant.js
"use client";
import { useState } from "react";

const PersonalAssistant = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setResponse("");

        if (!prompt) {
            setError("Please enter a prompt.");
            return;
        }

        try {
            const res = await fetch(`${window.location.origin}/api/openai/gpt-4`, { // Change origin to window.location.origin
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const apiResponse = await res.json();

            if (res.ok) {
                setResponse(apiResponse.message);
            } else {
                throw new Error(apiResponse.error || "Failed to fetch the AI response");
            }

        } catch (err) {
            setError(err.message);
        }
    };

    // Log the response state variable, not data
    console.log("Response:", response);


    return (
        <div className="max-w-xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                        Your Prompt
                    </label>
                    <input
                        type="text"
                        name="prompt"
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Send
                </button>
            </form>
            {response && <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md">
                Response: {response}
            </div>}
            {error && <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md">
                Error: {error}
            </div>}
        </div>
    );
};

export default PersonalAssistant;
