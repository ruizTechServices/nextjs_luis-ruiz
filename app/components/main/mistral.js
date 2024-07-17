// components/main/mistral.js
import { useState } from 'react';

export default function MistralChat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    const res = await fetch('/api/mistral/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat with Mistral AI</h1>
      <textarea
        rows="4"
        cols="50"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <br />
      <button onClick={sendMessage}>Send</button>
      <h2>Response:</h2>
      <p>{response}</p>
    </div>
  );
}
