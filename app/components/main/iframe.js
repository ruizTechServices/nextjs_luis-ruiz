import React from 'react';
import Link from 'next/link';

const projects = [
  { url: "https://catherineruiz.com", title: "Catherine Ruiz's Website" },
  { url: "https://Compulogicpc.com", title: "Compulogic" },
  // { url: 'https://ruiztechservices.com', title: 'https://ruiztechservices.com' },
  { url: "https://24hourgpt.com", title: "24 Hour GPT: Premium Chatbot for $1 a day" },
  // { url: 'https://demon-child.com', title: 'https://demon-child.com' },
  { url: 'https://letmeexplain.online', title: 'Let Me Explain: An online feedback platform' },
  // { url: 'https://rrtruckingservices.com', title: 'https://rrtruckingservices.com' },
  // { url: 'https://dont-download.com', title: 'https://dont-download.com' },
];

const ProjectViewer = () => {
  return (
    <div className="">
      <div className="border-2 border-gray-600 rounded-xl p-2 container mx-auto flex flex-col items-center justify-center mb-48 flex-wrap md:flex-row">
        {projects.map((project, index) => (
          <div
            key={index}
            className="text-center flex flex-col items-center justify-center"
          >
            <iframe
              src={project.url}
              title={project.title}
              className="w-[400px] h-[500px] shadow-2xl rounded-xl border-2 border-gray-600"
            />
            <Link className='hover:cursor-pointer' href={project.url}><p>{project.title}</p></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectViewer;
