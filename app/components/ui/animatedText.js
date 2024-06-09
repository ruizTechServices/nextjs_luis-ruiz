// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\ui\animatedText.js
import React, { useState, useEffect } from "react";

const AnimatedText = ({ texts, speed = 2000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, speed);

    return () => clearInterval(interval);
  }, [texts.length, speed]);

  return (
    <div className="overflow-hidden h-[100px] relative">
      <div className="whitespace-nowrap animation-typing">
        {texts[index]} <span className="animate-blink">|</span>
      </div>
      <div className="absolute whitespace-nowrap animation-blink border-gray-900 h-full"></div>
    </div>
  );
};

export default AnimatedText;
