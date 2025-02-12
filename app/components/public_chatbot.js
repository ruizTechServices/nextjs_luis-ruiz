// app/components/public_chatbot.js
"use client";

import React, { useState, useEffect } from "react";
import { Send, Plus, MessageSquare, Menu, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

// Create the Supabase client using your public keys
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ChatComponent() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]); // Chat messages for the active conversation
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]); // List of conversation IDs
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch the list of conversation IDs from Supabase
  const fetchConversations = async () => {
    const { data, error } = await supabase
      .from("conversations")
      .select("conversation_id");
    if (error) {
      console.error("Error fetching conversations:", error);
      return;
    }
    if (data) {
      // Get unique conversation IDs
      const uniqueConversations = Array.from(
        new Set(data.map((item) => item.conversation_id))
      );
      setConversations(uniqueConversations);
    }
  };

  // Fetch the full chat history for a specific conversation from Supabase
  const fetchChatHistory = async (convId) => {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("conversation_id", convId)
      .order("position_id", { ascending: true });
    if (error) {
      console.error("Error fetching chat history:", error);
      return;
    }
    if (data) {
      const messages = data.map((msg) => ({
        id: msg.position_id,
        role: msg.role,
        content: msg.message,
      }));
      setChat(messages);
    }
  };

  // On component mount, load conversation list and the last active conversation (if any)
  useEffect(() => {
    fetchConversations();
    const storedConvId = localStorage.getItem("conversationId");
    if (storedConvId) {
      setConversationId(storedConvId);
      fetchChatHistory(storedConvId);
    }
  }, []);

  // When a user selects a conversation, load its history
  const handleConversationSelect = (convId) => {
    setConversationId(convId);
    localStorage.setItem("conversationId", convId);
    fetchChatHistory(convId);
    setSidebarOpen(false);
  };

  // Handle sending a message (user message and fetching the assistant response)
  const handleSend = async () => {
    if (!input.trim()) return;

    let convId = conversationId;
    if (!convId) {
      // If no conversation is active, create a new one
      convId = uuidv4();
      setConversationId(convId);
      localStorage.setItem("conversationId", convId);
      fetchConversations();
    }

    // Optimistically add the user's message to the UI
    const userMessage = { id: Date.now(), role: "user", content: input };
    setChat((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput("");

    try {
      // Call your API route that handles Supabase insertion and OpenAI response
      const response = await fetch("/api/openai/gpt-4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: currentInput, conversation_id: convId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      // Append the assistant's response to the chat
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.message,
      };
      setChat((prev) => [...prev, assistantMessage]);
      // Refresh conversation list in case a new conversation was created
      fetchConversations();
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: `Error: ${error.message}` },
      ]);
    }
  };

  // Handle Enter key to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Mobile Header */}
      <header className="md:hidden bg-white px-4 py-3 flex items-center justify-between shadow-md">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-gray-800 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Community Chatbot</h1>
        <div className="w-6" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:static inset-y-0 left-0 z-50
            w-72 bg-white shadow-lg transform transition-all duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 md:w-64 lg:w-72
          `}
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h2 className="font-semibold text-gray-800">Chats</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* New Chat button resets the conversation */}
            <button
              onClick={() => {
                setConversationId(null);
                localStorage.removeItem("conversationId");
                setChat([]);
                setSidebarOpen(false);
              }}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 transition-all transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>New Chat</span>
            </button>
          </div>
          <nav className="overflow-y-auto h-full pb-20">
            {conversations.map((conv) => (
              <button
                key={conv}
                onClick={() => handleConversationSelect(conv)}
                className={`
                  w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3
                  transition-all duration-200 ${conv === conversationId ? "bg-blue-50 text-blue-600" : "text-gray-700"}
                `}
              >
                <MessageSquare className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{conv}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {chat.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      px-4 py-2 rounded-lg max-w-[85%] md:max-w-[75%] break-words shadow-sm
                      ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}
                    `}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="max-w-3xl mx-auto flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}