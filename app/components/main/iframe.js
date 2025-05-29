import React from 'react';
import Link from 'next/link';

const projects = [
  { url: 'https://catherineruiz.com',       title: "Catherine Ruiz’s Website", description: 'A website for Catherine Ruiz. It was built from scratch using HTML, CSS, and JavaScript.' },
  { url: 'https://Compulogicpc.com',        title: 'Compulogic', description: 'A website for a computer shop in PA. It was made with NextJS, TailwindCSS, and hosted on Vercel.' },
  { url: 'https://ruiztechservices.com',    title: 'ruizTechServices | Online Tech Support', description: 'A website for my tech company, ruizTechServices. It was made with NextJS, TailwindCSS, and hosted on Vercel.' },
  { url: 'https://username-generator-pure-giovanniruiz5.replit.app/', title: 'Username Generator for Social & Streaming', description: 'A website for generating usernames for social media and streaming. It was made with HTML, CSS, and JavaScript.' },
  { url: 'https://osvaldybarber.com',       title: 'Osvaldy Barber – Full-Service Barbershop', description: 'A website for a barber named Osvaldy. It was made with NextJS, TailwindCSS, and hosted on Vercel.' },
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
            <p className="text-gray-600">
              {project.description}
            </p>
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
