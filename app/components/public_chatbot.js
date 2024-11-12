import React, { useState } from "react";
import { Send, Plus, MessageSquare, Menu, X } from "lucide-react";

export default function Component() {
  const [chats, setChats] = useState([
    { id: 1, messages: [], title: "New Chat" },
  ]);
  const [activeChat, setActiveChat] = useState(1);
  const [input, setInput] = useState("");
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        text: input,
        isUser: true,
      };

      try {
        const response = await fetch("/api/openai/gpt-4_main", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: input, chatId: activeChat }),
        });

        const data = await response.json();

        const responseMessage = {
          text: data.message,
          isUser: false,
        };

        setChats((prevChats) =>
          prevChats.map((chat) => {
            if (chat.id === activeChat && chat.title === "New Chat") {
              const firstThreeWords = input.trim().split(" ").slice(0, 3).join(" ") || "New Chat";
              return {
                ...chat,
                messages: [...chat.messages, newMessage, responseMessage],
                title: firstThreeWords,
              };
            }
            return chat.id === activeChat
              ? {
                  ...chat,
                  messages: [...chat.messages, newMessage, responseMessage],
                }
              : chat;
          })
        );
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
      }

      setInput("");
    }
  };

  const createNewChat = () => {
    const newChatId = chats.length + 1;
    setChats((prevChats) => [
      ...prevChats,
      {
        id: newChatId,
        messages: [{ text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false }],
        title: "New Chat",
      },
    ]);
    setActiveChat(newChatId);
    setSidebarOpen(false);
  };

  const switchChat = (chatId) => {
    setActiveChat(chatId);
    setSidebarOpen(false);
  };

  return (
    <div className="border-t-2 border-black flex flex-col h-screen bg-gray-200">
      {/* Mobile Header */}
      <div className="md:hidden bg-white px-4 py-3 flex items-center justify-between shadow">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-gray-800">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Community Chatbot</h1>
        <div className="w-6" /> {/* Spacer for alignment */}
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-40
          w-72 bg-white border-r transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:w-64 lg:w-72
        `}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h2 className="font-semibold">Chats</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={createNewChat}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 
                       flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Chat</span>
            </button>
          </div>

          <div className="overflow-y-auto h-full pb-20">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => switchChat(chat.id)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3
                           transition-colors duration-150 ${activeChat === chat.id ? 'bg-gray-100' : ''}`}
              >
                <MessageSquare className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {chats.find((chat) => chat.id === activeChat)?.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-[85%] md:max-w-[75%] break-words
                               ${message.isUser 
                                 ? 'bg-blue-500 text-white' 
                                 : 'bg-gray-200 text-gray-800'}`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="border-t bg-white p-4">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                           transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </main>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}