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
        <div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows="4"
                cols="50"
                placeholder="Type text here..."
            />
            <button onClick={speak}>Speak</button>
        </div>
    );
};

export default TextToSpeech;