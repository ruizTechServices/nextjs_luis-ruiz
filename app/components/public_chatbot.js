import React, { useState } from "react";
import { Send, Plus, MessageSquare, Menu, X } from "lucide-react";
import { index } from "../../lib/utils/pinecone/pinecone";
import supabase from "../../lib/utils/supabase/supabaseClient";

export default function Component() {
  const [chats, setChats] = useState([{ id: 1, messages: [] }]);
  const [activeChat, setActiveChat] = useState(1);
  const [input, setInput] = useState("");
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { text: input, isUser: true };

      try {
        // Generate embedding for the input
        const embeddingResponse = await fetch("/api/openai/embedding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input }),
        });

        const embeddingData = await embeddingResponse.json();

        if (!embeddingResponse.ok) {
          throw new Error(embeddingData.error || "Failed to fetch embedding");
        }

        const vector = embeddingData.vector;

        // Upsert vector into Pinecone
        await index.namespace("public-chatbot").upsert([
          {
            id: `chat-${activeChat}-msg-${Date.now()}`,
            values: vector,
            metadata: { chat_id: activeChat, text: input },
          },
        ]);

        // Query Pinecone for similar vectors
        const queryResults = await index.namespace("public-chatbot").query({
          vector: vector,
          topK: 3,
          includeMetadata: true
        });

        // Process query results to create context for the AI
        const similarMessages = queryResults.matches.map(match => match.metadata.text);
        const context = similarMessages.join("\n");

        // Call the OpenAI API with the context
        const response = await fetch("/api/openai/gpt-4o_mini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            prompt: input,
            context: context
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch response from OpenAI");
        }

        const responseMessage = { text: data.message, isUser: false };

        const updatedChats = chats.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: [...chat.messages, newMessage, responseMessage],
              }
            : chat
        );

        setChats(updatedChats);
        setInput("");

        // Store messages in Supabase
        const { error } = await supabase.from("chats").insert([
          {
            chat_id: activeChat,
            message: input,
            created_at: new Date().toISOString(),
          },
          {
            chat_id: activeChat,
            message: responseMessage.text,
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) console.error("Error storing message:", error);
      } catch (error) {
        console.error("Error processing chat:", error);
        // Optionally, show an error message to the user
      }
    }
  };

  const createNewChat = () => {
    const newChatId = chats.length + 1;
    setChats([...chats, { id: newChatId, messages: [] }]);
    setActiveChat(newChatId);
    setSidebarOpen(false);
  };

  const switchChat = (chatId) => {
    setActiveChat(chatId);
    setSidebarOpen(false);
  };

  const toggleDisclosure = () => {
    setShowDisclosure(!showDisclosure);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-md">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Community Chatbot</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`w-full md:w-64 bg-white shadow-md overflow-y-auto transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static top-0 left-0 h-full z-30`}
      >
        <div className="p-4 flex justify-between items-center md:block">
          <button
            onClick={createNewChat}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" /> New Chat
          </button>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto h-full">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => switchChat(chat.id)}
              className={`w-full p-4 text-left hover:bg-gray-100 flex items-center ${activeChat === chat.id ? "bg-gray-200" : ""}`}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Chat {chat.id}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <section className="p-4 md:p-6 lg:p-10 flex-1 overflow-y-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-black mb-4 md:mb-6 lg:mb-8">
            Community Chatbot
          </h2>
          <div className="text-center mb-4 md:mb-6 lg:mb-10">
            <button
              className="text-base md:text-lg text-gray-600 underline focus:outline-none"
              onClick={toggleDisclosure}
              aria-expanded={showDisclosure}
              aria-controls="disclosure-text"
            >
              {showDisclosure ? "CLOSE" : "DISCLOSURE"}
            </button>
            {showDisclosure && (
              <p
                id="disclosure-text"
                className="mt-2 text-sm md:text-base lg:text-lg text-gray-600"
              >
                Kindly refrain from posing personal or sensitive questions. Be
                advised that your questions and the chatbot&apos;s responses
                will be recorded and stored in our database to improve future
                interactions. These exchanges may also be visible to other
                users, so please exercise discretion.
              </p>
            )}
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 md:h-96 overflow-y-auto p-4 space-y-4">
              {chats
                .find((chat) => chat.id === activeChat)
                ?.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-sm lg:max-w-md px-3 py-2 rounded-lg ${message.isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
        <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
          <div className="flex max-w-3xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
