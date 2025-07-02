import React from 'react';
import Link from 'next/link';

const projects = [
  { url: 'https://ruiztechgroq.replit.app/', title: 'A groq mixture of Agents app' },
  { url: 'https://ragbot.replit.app/', title: 'A ragbot app' },
  { url: 'https://chatbot-with-browser-and-rag.replit.app/', title: 'A chatbot with browser and rag' },
  { url: 'https://agent-ai-practice-GiovanniRuiz5.replit.app/', title: 'A chatbot with manipulated context awareness.' },
];

const Projectai = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02] overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-4 flex flex-col gap-4">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                <iframe
                  src={project.url}
                  title={project.title}
                  className="absolute top-0 left-0 w-full h-full border-2 border-gray-200 dark:border-gray-700"
                  loading="lazy"
                />
              </div>
              <Link 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-center font-medium transition-colors duration-200"
              >
                <h3 className="text-sm sm:text-base lg:text-lg truncate">{project.title}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projectai;