import React, { useState, useEffect } from "react";
import { Send, Plus, MessageSquare, Menu, X } from "lucide-react";
import { createClient } from "../../lib/utils/supabase/supabaseClient";

export default function Component() {
  const supabase = createClient();
  const [chats, setChats] = useState([{ id: 1, messages: [] }]);
  const [activeChat, setActiveChat] = useState(1);
  const [input, setInput] = useState("");
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadChatHistory(activeChat);
  }, [activeChat]);

  const loadChatHistory = async (chatId) => {
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("message, created_at") // Removed 'is_user'
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const formattedMessages = data.map((msg) => ({
        text: msg.message,
        // Assuming all messages are from the user or AI, or you can add your own logic
        timestamp: msg.created_at,
      }));

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === chatId ? { ...chat, messages: formattedMessages } : chat,
        ),
      );
    } catch (error) {
      console.error("Error loading chat history:", error);
      alert("Failed to load chat history. Please try again.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        text: input,
        timestamp: new Date().toISOString(),
      };

      try {
        // Add the new user message to the chat immediately
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === activeChat
              ? { ...chat, messages: [...chat.messages, newMessage] }
              : chat,
          ),
        );

        // Call the GPT-4 Mini API (which now handles embeddings internally)
        const response = await fetch("/api/openai/gpt-4o_mini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: input, chatId: activeChat }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch response from API");
        }

        const responseMessage = {
          text: data.message,
          timestamp: new Date().toISOString(),
          embedding: data.embedding, // Assuming your API returns this
        };

        // Add the AI response to the chat
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === activeChat
              ? { ...chat, messages: [...chat.messages, responseMessage] }
              : chat,
          ),
        );

        setInput("");

        // Store messages in Supabase, including embeddings
        await storeMessages(activeChat, [newMessage, responseMessage]);
      } catch (error) {
        console.error("Error processing chat:", error);
        alert(
          "An error occurred while processing your message. Please try again.",
        );
      }
    }
  };

  const storeMessages = async (chatId, messages) => {
    try {
      const { error } = await supabase.from("chat_messages").insert(
        messages.map((msg) => ({
          chat_id: chatId,
          message: msg.text,
          created_at: msg.timestamp,
        })),
      );

      if (error) throw error;
    } catch (error) {
      console.error("Error storing messages:", error);
    }
  };

  const createNewChat = async () => {
    try {
      // Insert a new chat and retrieve its ID
      const { data: newChat, error: chatError } = await supabase
        .from("chats")
        .insert({ created_at: new Date().toISOString() }) // Adjust according to your chat schema
        .select("id"); // Assuming 'id' is the primary key of 'chats' table

      if (chatError) throw chatError;

      const newChatId = newChat[0].id;

      // Insert a starting message for the new chat
      const { error: messageError } = await supabase
        .from("chat_messages")
        .insert({
          chat_id: newChatId,
          message: "Chat started",
          created_at: new Date().toISOString(),
        });

      if (messageError) throw messageError;

      // Update state
      setChats((prevChats) => [...prevChats, { id: newChatId, messages: [] }]);
      setActiveChat(newChatId);
      setSidebarOpen(false);
    } catch (error) {
      console.error("Error creating new chat:", error);
      alert("Failed to create a new chat. Please try again.");
    }
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
        className={`w-full md:w-64 bg-white shadow-md overflow-y-auto transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static top-0 left-0 h-full z-30`}
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
              className={`w-full p-4 text-left hover:bg-gray-100 flex items-center ${
                activeChat === chat.id ? "bg-gray-200" : ""
              }`}
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
            <div className="h-screen md:h-full overflow-y-auto p-4 space-y-4">
              {chats
                .find((chat) => chat.id === activeChat)
                ?.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-sm lg:max-w-md px-3 py-2 rounded-lg ${
                        message.isUser
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
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

      {/* Overlay for mobile when the sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
