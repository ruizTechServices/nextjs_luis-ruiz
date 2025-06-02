import React, { useState } from 'react';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const speak = () => {
        if ('speechSynthesis' in window) {
            if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
                // Already speaking, so pause
                window.speechSynthesis.pause();
                setIsPaused(true);
                return;
            }
            
            if (window.speechSynthesis.paused) {
                // Currently paused, so resume
                window.speechSynthesis.resume();
                setIsPaused(false);
                return;
            }

            // Start new speech
            const utterance = new SpeechSynthesisUtterance(text);
            
            utterance.onstart = () => {
                setIsPlaying(true);
                setIsPaused(false);
            };
            
            utterance.onend = () => {
                setIsPlaying(false);
                setIsPaused(false);
            };
            
            utterance.onerror = () => {
                setIsPlaying(false);
                setIsPaused(false);
            };
            
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Sorry, your browser does not support text to speech!');
        }
    };

    const stop = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            setIsPaused(false);
        }
    };

    const getButtonText = () => {
        if (isPlaying && !isPaused) return 'Pause';
        if (isPaused) return 'Resume';
        return 'Speak';
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
            <div className="flex gap-2">
                <button 
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-gray-400"
                    onClick={speak}
                    disabled={!text.trim()}
                >
                    {getButtonText()}
                </button>
                <button 
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 disabled:bg-gray-400"
                    onClick={stop}
                    disabled={!isPlaying && !isPaused}
                >
                    Stop
                </button>
            </div>
            {(isPlaying || isPaused) && (
                <div className="mt-2 text-sm text-gray-600">
                    Status: {isPaused ? 'Paused' : 'Playing'}
                </div>
            )}
        </div>
    );
};

export default TextToSpeech;