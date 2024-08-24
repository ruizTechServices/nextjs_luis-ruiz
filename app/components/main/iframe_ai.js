import React from 'react';
import Link from 'next/link';

const projects = [
  { url: "https://www.24hourgpt.com", title: "24 Hour GPT: Premium Chatbot for $1 a day" },
  { url: 'https://ruiztechgroq.replit.app/', title: 'A groq mixture of Agents app' },
];

const Projectai = () => {
  return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-2 border-gray-600 rounded-xl p-2 container mx-auto items-center justify-center mb-48">
        {projects.map((project, index) => (
          <div
            key={index}
            className="text-center flex flex-col items-center justify-center"
          >
            <iframe
              src={project.url}
              title={project.title}
              className="md:w-[400px] h-[500px] shadow-2xl rounded-xl border-2 border-gray-600"
            />
            <Link className='hover:cursor-pointer text-blue-400 dark:text-black' href={project.url}><p>{project.title}</p></Link>
          </div>
        ))}
      </div>
  );
};

export default Projectai;
