import React, { useState } from 'react';

const soundFiles = [
  'anime-wow-sound-effect.mp3',
  'dry-fart.mp3',
  'ewww.mp3',
  'meow.mp3',
  'mlg-airhorn.mp3',
  'roblox-death-sound_1.mp3',
  'stop-the-cap-cut.mp3',
  'vine-boom.mp3'
];

const SoundButton = ({ sound }) => {
  const [isPressed, setIsPressed] = useState(false);

  const playSound = () => {
    const audio = new Audio(`/sounds/${sound}`);
    audio.play();
  };

  return (
    <button
      className={`m-2 p-4 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 text-white font-bold shadow-lg transition-all duration-200 ease-in-out transform ${
        isPressed ? 'scale-95 brightness-90' : 'hover:brightness-110'
      }`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={playSound}
    >
      {sound.replace('.mp3', '').replace(/-/g, ' ')}
    </button>
  );
};

const Soundboard = () => {
  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">My Awesome Soundboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {soundFiles.map((sound, index) => (
          <SoundButton key={index} sound={sound} />
        ))}
      </div>
    </div>
  );
};

export default Soundboard