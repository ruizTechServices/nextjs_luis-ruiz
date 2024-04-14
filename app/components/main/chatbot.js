import { useState } from "react";
import supabase from "../../../lib/utils/supabase/supabaseClient";

export const ChatbotForm = () => {
  const [selectedAPI, setSelectedAPI] = useState("");
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const handleAPIChange = (event) => {
    setSelectedAPI(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Placeholder for API integration logic
    console.log(
      "Sending message to: ",
      selectedAPI,
      " with message: ",
      message
    );
    // Reset message input
    setMessage("");
  };

  return (
    <section className="container mx-auto p-4 w-3/4 shadow-2xl m-10 rounded-lg bg-white dark:bg-gray-800">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="api"
            className="block text-sm font-medium text-gray-700"
          >
            Choose an API
          </label>
          <select
            name="api"
            id="api"
            value={selectedAPI}
            onChange={handleAPIChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select an API</option>
            <option value="GPT-4">OpenAI&apos;s GPT-4</option>
            <option value="Claude3Opus">Anthropic&apos;s Claude</option>
            <option value="Gemini">Google&apos;s Gemini</option>
            <option value="Mistral">Mistral&apos;s AI</option>
            <option value="Llama2">Llama 2</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows="3"
            value={message}
            onChange={handleMessageChange}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-2xl text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send
        </button>
      </form>
    </section>
  );
};
