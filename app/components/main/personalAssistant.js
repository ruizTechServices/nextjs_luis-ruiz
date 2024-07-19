"use client";
import { useState } from "react";

const PersonalAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  // Added for loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResponse("");
    setLoading(true);  // Start loading

    if (!prompt) {
      setError("Please enter a prompt.");
      setLoading(false);  // Stop loading
      return;
    }

    try {
      const res = await fetch(
        `${window.location.origin}/api/pinecone`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();  // Log the HTML error page
        throw new Error(`Error: ${errorText}`);
      }

      const apiResponse = await res.json();
      setResponse(apiResponse.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);  // Stop loading regardless of outcome
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
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
            disabled={loading}  // Disable button during loading
            className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Loading..." : "Send"}  {/*/ Change button text on loading*/}
          </button>
        </form>
        {response && (
          <div className="mt-4 p-4 w-full bg-green-100 text-green-700 rounded-md">
            Response: {response}
          </div>
        )}
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
