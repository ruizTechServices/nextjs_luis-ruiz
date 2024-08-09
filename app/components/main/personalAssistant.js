import React, { useState } from 'react';
import { Send, User } from 'lucide-react';

export default function Assistant() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    setIsLoading(true);
    const newMessage = { role: 'user', content: userMessage };
    setChatHistory(prevHistory => [...prevHistory, newMessage]);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage }),
      });
      const data = await res.json();
      setChatHistory(prevHistory => [...prevHistory, { role: 'ada', content: data.response }]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setChatHistory(prevHistory => [...prevHistory, { role: 'ada', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
      setUserMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Chat with Ada</h2>
      <div className="bg-white rounded-lg shadow-inner p-4 h-96 overflow-y-auto space-y-4">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'ada' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.role === 'ada'
                  ? 'bg-indigo-100 text-indigo-900'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              <div className="flex items-center mb-1">
                {msg.role === 'ada' ? (
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                    A
                  </div>
                ) : (
                  <User className="w-5 h-5 text-gray-600 mr-2" />
                )}
                <span className="font-semibold">{msg.role === 'ada' ? 'Ada' : 'You'}</span>
              </div>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask Ada something..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className={`p-2 rounded-lg ${
            isLoading
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-500 hover:bg-indigo-600'
          } text-white transition-colors duration-200`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}