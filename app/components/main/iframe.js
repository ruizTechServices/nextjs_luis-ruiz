import React from 'react';
import Link from 'next/link';

const projects = [
  { url: "https://catherineruiz.com", title: "Catherine Ruiz's Website" },
  { url: "https://Compulogicpc.com", title: "Compulogic" },
  { url: 'https://ruiztechservices.com', title: 'ruizTechServices| Online Tech Support' },
  { url: 'https://username-generator-pure-giovanniruiz5.replit.app/', title: 'A username generator app for social media and livestreamers' },
  // { url: 'https://demon-child.com', title: 'https://demon-child.com' },
  // { url: 'https://letmeexplain.online', title: 'Let Me Explain: An online feedback platform' },
  // { url: 'https://rrtruckingservices.com', title: 'https://rrtruckingservices.com' },
  // { url: 'https://dont-download.com', title: 'https://dont-download.com' },
  { url: 'https://osvaldybarber.com', title: 'Osvaldy Barber: A Full-Service Barber ' },
];

const ProjectViewer = () => {
  return (
      <div className="gap-4 border-2 border-gray-600 rounded-xl p-2 container mx-auto grid grid-cols-1 md:grid-cols-3 items-center justify-center mb-48">
        {projects.map((project, index) => (
          <div
            key={index}
            className="text-center flex flex-col items-center justify-center"
          >
            <iframe
              src={project.url}
              title={project.title}
              className="w-full h-[500px] shadow-2xl rounded-xl border-2 border-gray-600"
            />
            <Link className='hover:cursor-pointer text-blue-400 dark:text-black' href={project.url}><p>{project.title}</p></Link>
          </div>
        ))}
      </div>
  );
};

export default ProjectViewer;
