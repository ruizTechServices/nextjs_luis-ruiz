import React, { useState, useEffect } from "react";

export default function Arrowdown() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 3000); // Show after 5000 ms = 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const scrollToHero = () => {
    window.scrollTo({
      top: 700,
      behavior: "smooth"
    });
  };

  return (
    <div className="relative flex justify-center">
      {showArrow &&
        <div onClick={scrollToHero} className="animate-bounce absolute bottom-10 hover:cursor-pointer">
          <svg
            className="w-20 h-20 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>}
    </div>
  );
}
