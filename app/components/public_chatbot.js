import { useState } from 'react';
import { Send, Plus, MessageSquare } from 'lucide-react';

export default function Component() {
  const [chats, setChats] = useState([{ id: 1, messages: [] }]);
  const [activeChat, setActiveChat] = useState(1);
  const [input, setInput] = useState('');
  const [showDisclosure, setShowDisclosure] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const updatedChats = chats.map(chat => 
        chat.id === activeChat 
          ? { ...chat, messages: [...chat.messages, { text: input, isUser: true }, { text: 'fix me', isUser: false }] }
          : chat
      );
      setChats(updatedChats);
      setInput('');
    }
  };

  const createNewChat = () => {
    const newChatId = chats.length + 1;
    setChats([...chats, { id: newChatId, messages: [] }]);
    setActiveChat(newChatId);
  };

  const switchChat = (chatId) => {
    setActiveChat(chatId);
  };

  const toggleDisclosure = () => {
    setShowDisclosure(!showDisclosure);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <button 
            onClick={createNewChat}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" /> New Chat
          </button>
        </div>
        <div className="overflow-y-auto h-full">
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => switchChat(chat.id)}
              className={`w-full p-4 text-left hover:bg-gray-100 flex items-center ${activeChat === chat.id ? 'bg-gray-200' : ''}`}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Chat {chat.id}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <section className="p-4 md:p-10 flex-1 overflow-y-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-black mb-4 md:mb-8">Community Chatbot</h2>
          <div className="text-center mb-6 md:mb-10">
            <button 
              className="text-base md:text-lg text-gray-600 underline focus:outline-none" 
              onClick={toggleDisclosure}
              aria-expanded={showDisclosure}
              aria-controls="disclosure-text"
            >
              {showDisclosure ? 'CLOSE' : 'DISCLOSURE'}
            </button>
            {showDisclosure && (
              <p id="disclosure-text" className="mt-2 text-base md:text-lg text-gray-600">
                Kindly refrain from posing personal or sensitive questions. Be advised that your questions and the chatbot's responses will be recorded and stored in our database to improve future interactions. These exchanges may also be visible to other users, so please exercise discretion.
              </p>
            )}
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {chats.find(chat => chat.id === activeChat)?.messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
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
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}