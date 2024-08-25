import React, { useState } from "react";
import { Send, Plus, MessageSquare, Menu, X } from "lucide-react"; // Importing icons from the lucide-react library
import { index } from "../../lib/utils/pinecone/pinecone"; // Importing the Pinecone index
import { createClient } from "../../lib/utils/supabase/supabaseClient"; // Importing the Supabase client

export default function Component() {
  const supabase = createClient(); // Creating a Supabase client
  // State variables for managing chats, active chat, input, and UI states
  const [chats, setChats] = useState([{ id: 1, messages: [] }]); // Initial state with one chat
  const [activeChat, setActiveChat] = useState(1); // State for tracking the currently active chat
  const [input, setInput] = useState(""); // State for managing the user input in the chat
  const [showDisclosure, setShowDisclosure] = useState(false); // State for toggling the disclosure text visibility
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for toggling the sidebar visibility on mobile

  // Function to handle the form submission when the user sends a message
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    if (input.trim()) {
      // Check if the input is not empty
      const newMessage = { text: input, isUser: true }; // Create a new message object

      try {
        // Step 1: Generate an embedding for the input text
        const embeddingResponse = await fetch("/api/openai/embedding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input }), // Send the user input to the API
        });

        const embeddingData = await embeddingResponse.json(); // Parse the response

        if (!embeddingResponse.ok) {
          throw new Error(embeddingData.error || "Failed to fetch embedding");
        }

        const vector = embeddingData.vector; // Extract the embedding vector from the response

        // Step 2: Upsert (insert or update) the vector into Pinecone's index
        await index.namespace("public-chatbot").upsert([
          {
            id: `chat-${activeChat}-msg-${Date.now()}`, // Unique ID for the message
            values: vector, // The embedding vector
            metadata: { chat_id: activeChat, text: input }, // Additional metadata
          },
        ]);

        // Step 3: Query Pinecone for similar vectors
        const queryResults = await index.namespace("public-chatbot").query({
          vector: vector, // The embedding vector to query
          topK: 3, // The number of similar vectors to retrieve
          includeMetadata: true, // Include metadata in the results
        });

        // Step 4: Process query results to create context for the AI
        const similarMessages = queryResults.matches.map(
          (match) => match.metadata.text,
        );
        const context = similarMessages.join("\n"); // Combine similar messages to form context

        // Step 5: Call the OpenAI API with the input and context to generate a response
        const response = await fetch("/api/openai/gpt-4o_mini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: input, // The user input
            context: context, // The context from similar messages
          }),
        });

        const data = await response.json(); // Parse the API response

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch response from OpenAI");
        }

        const responseMessage = { text: data.message, isUser: false }; // Create a response message object

        // Step 6: Update the chat state with the new message and the AI response
        const updatedChats = chats.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: [...chat.messages, newMessage, responseMessage], // Add both user and AI messages
              }
            : chat,
        );

        setChats(updatedChats); // Update the state with the new chat data
        setInput(""); // Clear the input field

        // Step 7: Store the messages in Supabase for persistence
        const { data: insertData, error: insertError } = await supabase
          .from("chats")
          .insert([
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

        if (insertError) {
          console.error("Error storing messages:", insertError);
          // Optionally, show an error message to the user
          alert("Failed to save messages. Please try again.");
        } else {
          console.log("Messages stored successfully:", insertData);
        }
      } catch (error) {
        console.error("Error processing chat:", error);
        // Optionally, show an error message to the user
        alert(
          "An error occurred while processing your message. Please try again.",
        );
      }
    }
  };

  // Function to create a new chat
  const createNewChat = () => {
    const newChatId = chats.length + 1; // Generate a new chat ID
    setChats([...chats, { id: newChatId, messages: [] }]); // Add the new chat to the state
    setActiveChat(newChatId); // Set the new chat as the active chat
    setSidebarOpen(false); // Close the sidebar on mobile
  };

  // Function to switch between chats
  const switchChat = (chatId) => {
    setActiveChat(chatId); // Set the selected chat as active
    setSidebarOpen(false); // Close the sidebar on mobile
  };

  // Function to toggle the disclosure text visibility
  const toggleDisclosure = () => {
    setShowDisclosure(!showDisclosure); // Toggle the state for disclosure visibility
  };

  // Function to toggle the sidebar visibility on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the state for sidebar visibility
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-md">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700"
        >
          <Menu className="w-6 h-6" /> {/* Menu icon for opening the sidebar */}
        </button>
        <h1 className="text-xl font-bold">Community Chatbot</h1>{" "}
        {/* Header title */}
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
            <Plus className="w-5 h-5 mr-2" /> New Chat{" "}
            {/* Button to create a new chat */}
          </button>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" /> {/* Close icon to close the sidebar */}
          </button>
        </div>
        <div className="overflow-y-auto h-full">
          {/* List of chats in the sidebar */}
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => switchChat(chat.id)}
              className={`w-full p-4 text-left hover:bg-gray-100 flex items-center ${activeChat === chat.id ? "bg-gray-200" : ""}`}
            >
              <MessageSquare className="w-5 h-5 mr-2" /> {/* Icon for chat */}
              Chat {chat.id} {/* Display the chat ID */}
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
            {/* Disclosure section */}
            <button
              className="text-base md:text-lg text-gray-600 underline focus:outline-none"
              onClick={toggleDisclosure}
              aria-expanded={showDisclosure}
              aria-controls="disclosure-text"
            >
              {showDisclosure ? "CLOSE" : "DISCLOSURE"}{" "}
              {/* Toggle button text */}
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
              </p> /* Disclosure text content */
            )}
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {/* Chat messages display */}
            <div className="h-screen md:h-full overflow-y-auto p-4 space-y-4">
              {chats
                .find((chat) => chat.id === activeChat) // Find the active chat
                ?.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-sm lg:max-w-md px-3 py-2 rounded-lg ${message.isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                      {message.text} {/* Display the message text */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
        {/* Input form for sending messages */}
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
              <Send className="w-5 h-5" />{" "}
              {/* Send icon for the submit button */}
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
