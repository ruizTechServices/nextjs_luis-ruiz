import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Add a loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);

    try {
      const response = await fetch("/api/hugging_face/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data.content },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role === "user" ? "You" : "Bot"}: </strong>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading} // Disable input when loading
        />
        <button type="submit" disabled={loading}>
          {" "}
          {/* Disable button when loading */}
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
