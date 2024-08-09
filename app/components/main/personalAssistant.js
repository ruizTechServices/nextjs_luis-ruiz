import { useState } from 'react';

export default function Assistant() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    const res = await fetch('/api/openai/assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userMessage }),
    });

    const data = await res.json();
    setChatHistory([...chatHistory, { role: 'user', content: userMessage }, { role: 'ada', content: data.response }]);
    setUserMessage('');
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Chat with Ada</h2>
      <div className="space-y-2">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`p-2 rounded ${msg.role === 'ada' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'}`}>
            <strong>{msg.role === 'ada' ? 'Ada' : 'You'}: </strong>{msg.content}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Ask Ada something..."
          className="flex-1 p-2 border rounded"
        />
        <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded">Send</button>
      </div>
    </div>
  );
}
