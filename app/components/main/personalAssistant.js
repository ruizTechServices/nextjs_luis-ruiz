"use client";
import { useState } from "react";

// The main Personal Assistant Component
const PersonalAssistant = () => {
  // State for managing user prompt
  const [prompt, setPrompt] = useState("");
  // State for storing the ongoing conversation
  const [conversation, setConversation] = useState([]);
  // State for managing error messages
  const [error, setError] = useState("");
  // State to indicate loading status
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Clear previous errors
    setError("");
    // Set loading to true while processing
    setLoading(true);

    // Check if the prompt is empty
    if (!prompt) {
      setError("Please enter a prompt.");
      setLoading(false);
      return;
    }

    try {
      // Make a POST request to the backend API
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

      // If the response is not OK, throw an error
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error: ${errorText}`);
      }

      // Extract the message from the API response
      const apiResponse = await res.json();
      // Update the conversation with the new prompt and the response
      setConversation((prev) => [...prev, prompt, apiResponse.message]);
      // Clear the prompt input
      setPrompt("");
    } catch (err) {
      // Set error message
      setError(err.message);
    } finally {
      // Set loading to false after processing
      setLoading(false);
    }
  };

  return (
    // Main container for the component
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {/* Display conversation history */}
        <div className="mb-4 h-64 overflow-y-auto">
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                index % 2 === 0
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </div>
          ))}
        </div>
        {/* Form for user input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-700"
            >
              Your Prompt
            </label>
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
        {/* Display error message if there is any */}
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