import React from 'react';
import Link from 'next/link';

const projects = [
  { url: 'https://catherineruiz.com',       title: "Catherine Ruiz’s Website" },
  { url: 'https://Compulogicpc.com',        title: 'Compulogic' },
  { url: 'https://ruiztechservices.com',    title: 'ruizTechServices | Online Tech Support' },
  { url: 'https://username-generator-pure-giovanniruiz5.replit.app/', title: 'Username Generator for Social & Streaming' },
  { url: 'https://osvaldybarber.com',       title: 'Osvaldy Barber – Full-Service Barbershop' },
];

const ProjectViewer = () => (
  <div className="container mx-auto flex flex-col gap-12 p-4 lg:p-8">
    {projects.map((project, idx) => {
      const rowDir = idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse';

      return (
        <section
          key={project.url}
          className={`flex flex-col ${rowDir} items-center gap-6`}
        >
          {/* IFRAME */}
          <div className="w-full md:w-2/3">
            <iframe
              src={project.url}
              title={project.title}
              loading="lazy"
              className="aspect-video w-full rounded-xl border border-gray-600 shadow-lg"
            />
          </div>

          {/* TEXT BLOCK */}
          <div className="w-full md:w-1/3 space-y-4 text-center md:text-left">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Visit site&nbsp;→
            </Link>
          </div>
        </section>
      );
    })}
  </div>
);

export default ProjectViewer;
