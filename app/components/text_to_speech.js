import React, { useState } from 'react';

const TextToSpeech = () => {
    const [text, setText] = useState('');

    const speak = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Sorry, your browser does not support text to speech!');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <textarea
                className="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-md focus:outline-none focus:ring focus:border-blue-300"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows="4"
                cols="50"
                placeholder="Type text here..."
            />
            <button 
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                onClick={speak}
            >
                Speak
            </button>
        </div>
    );
};

export default TextToSpeech;