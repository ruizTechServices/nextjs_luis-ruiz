// components/ui/ScrollToTopArrow.js
"use client";
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTopArrow() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled beyond a certain point
  const toggleVisibility = () => {
    if (window.pageYOffset > 700) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="md:flex md:justify-center md:items-center md:h-[100px] md:w-[100px] bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-500 transition duration-300 ease-in-out"
          aria-label="Scroll to top"
        >
          <FaArrowUp className='md:text-7xl'/>
        </button>
      )}
    </div>
  );
}
