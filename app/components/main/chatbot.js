//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\chatbot.js
"use client";
import { useState } from "react";

export const ChatbotForm = () => {
  const [selectedAPI, setSelectedAPI] = useState("");
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const handleAPIChange = (event) => {
    setSelectedAPI(event.target.value);
    setFetchError(null); // Reset error when changing API
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedAPI || !message.trim()) {
      setFetchError("Select a valid API and enter a message");
      return;
    }

    try {
      let response;
      if (selectedAPI === "GPT-4") {
        const res = await fetch("/api/openai/gpt-4", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: message }),
        });

        if (!res.ok) {
          throw new Error("Server responded with an error!");
        }

        const data = await res.json();
        response = data.message;
      } else if (selectedAPI === "Claude3Opus") {
        const res = await fetch("/api/anthropic/claude3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: message }),
        });

        if (!res.ok) {
          throw new Error("Server responded with an error!");
        }

        const data = await res.json();
        response = data.message;
      }
      // Other API cases similarly...
      setResponses((prevResponses) => [...prevResponses, response]);
    } catch (error) {
      console.error("Fetch error:", error);
      setFetchError("Failed to fetch response: " + error.message);
    }

    setMessage("");
}};
