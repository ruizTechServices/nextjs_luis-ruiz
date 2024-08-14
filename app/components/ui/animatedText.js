// app/components/ui/animatedText.js
'use client';

import React, { useState, useEffect } from "react";

const AnimatedText = ({ texts, speed = 2000, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1000 }) => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimeout;

    if (!isDeleting && charIndex < texts[index].length) {
      // Typing out the text
      typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev + texts[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      // Deleting the text
      typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, deletingSpeed);
    } else if (charIndex === texts[index].length && !isDeleting) {
      // Pause after typing is complete
      setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (charIndex === 0 && isDeleting) {
      // Move to the next word and reset
      setIsDeleting(false);
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }

    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseTime, index]);

  return (
    <div className="overflow-hidden relative h-[100px] text-center">
      <span className="whitespace-nowrap text-7xl md:text-[80px] font-bold text-black mb-5">
        {displayedText}
      </span>
      <span className="animate-blink text-7xl md:text-[80px] font-bold text-black mb-5">|</span>
    </div>
  );
};

export default AnimatedText;
