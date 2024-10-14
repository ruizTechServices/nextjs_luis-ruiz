// app/components/main/openai/gpt-4.js
"use client";
import { useState } from "react";

function GPT4New() {
  const [userMessage, setUserMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userMessage) return;

    try {
      const res = await fetch(
        "https://chrome-24hourgpt-5bb1bcb92d7e.herokuapp.com/chat/chatbot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userMessage: userMessage,
          }),
        }
      );

      const data = await res.json();
      setResponse(data.response || "No response from GPT-4 API.");
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while fetching the response.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">GPT-4 Chatbot</h2>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="btn w-full bg-blue-500 text-white rounded p-2"
        >
          Send
        </button>
      </form>
      {response && (
        <div className="mt-4 p-2 bg-white rounded shadow">
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default GPT4New;
