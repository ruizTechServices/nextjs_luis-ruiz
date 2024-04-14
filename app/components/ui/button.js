import React from "react";

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-500 hover:scale-105"
    >
      {children}
    </button>
  );
}

export default Button;
