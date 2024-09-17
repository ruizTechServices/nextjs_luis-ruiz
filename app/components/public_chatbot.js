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

  // REPLACE THIS: Remove the sarcasticResponses array and replace it with your chatbot's actual response generation logic
  const sarcasticResponses = [
    "Oh sure, I could answer that... if only I were fully built.",
    "I'm just a half-baked chatbot, ask me again in a few updates.",
    "I'd love to help, but, you know... unfinished and all.",
    "Maybe you should try again once I'm not a work in progress?",
    "Yeah, I'm totally capable of answering that... or maybe not yet.",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        text: input,
        isUser: true,
      };

      // REPLACE THIS: Instead of picking a random sarcastic response, implement your chatbot's logic to generate a response based on the user's input
      const responseMessage = {
        text: sarcasticResponses[
          Math.floor(Math.random() * sarcasticResponses.length)
        ],
        isUser: false,
      };

      setChats((prevChats) =>
        prevChats.map((chat) => {
          // Only set the title if it's the first user message and title is "New Chat"
          if (chat.id === activeChat && chat.title === "New Chat") {
            const firstThreeWords =
              input.trim().split(" ").slice(0, 3).join(" ") || "New Chat";
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
        }),
      );

      setInput("");
    }
  };

  const createNewChat = () => {
    const newChatId = chats.length + 1;
    // REPLACE THIS: Change the starting message to something more appropriate for your chatbot
    const startingMessage =
      "This is the beginning of a new conversation. What could possibly go wrong?";
    setChats((prevChats) => [
      ...prevChats,
      {
        id: newChatId,
        messages: [{ text: startingMessage, isUser: false }],
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

  const toggleDisclosure = () => {
    setShowDisclosure(!showDisclosure);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
//////////////////////////////////////////
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
              {chat.title} {/* Display chat title */}
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
                {/* REPLACE THIS: Update the disclosure text to match your chatbot's specific privacy policy and capabilities */}
                Kindly refrain from posing personal or sensitive questions. Be
                advised that your questions and the chatbot&apos;s responses
                will be recorded and stored to improve future interactions.
                Since I&apos;m not fully built, expect sarcastic remarks.
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