//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\ui\dropdown.js
import { useState } from 'react';
import Link from 'next/link';

function Dropdown({ links }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-transform transform active:scale-95"
      >
        <span className="transition-opacity duration-200 ease-in-out opacity-100 group-hover:opacity-0">
          Menu
        </span>
        <span className="absolute opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
          Open Menu
        </span>
      </button>

      {isOpen && (
        <ul className="absolute md:left-0 md:bottom-5 md: bottom-0 left-10 w-30 mt-2 bg-white shadow-lg rounded-lg flex flex-col">
          {links.map((link) => (
            <li key={link.href} className="border-b last:border-b-0">
              <Link className="block px-4 py-2 hover:bg-gray-100 text-black" href={link.href} onClick={() => setIsOpen(!isOpen)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
