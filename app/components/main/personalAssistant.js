// app/components/main/personalAssistant.js
"use client";
import { useState } from "react";

const PersonalAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!prompt) {
      setError("Please enter a prompt.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${window.location.origin}/api/openai/personalAssistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, conversationHistory: conversation }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error: ${errorText}`);
      }

      const apiResponse = await res.json();
      setConversation(prev => [...prev, prompt, apiResponse.message]);
      setPrompt("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 h-64 overflow-y-auto">
          {conversation.map((message, index) => (
            <div key={index} className={`mb-2 p-2 rounded-lg ${index % 2 === 0 ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Your Prompt</label>
            <input
              type="text"
              name="prompt"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-4 w-full bg-red-100 text-red-700 rounded-md">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalAssistant;