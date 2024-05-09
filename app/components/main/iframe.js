import React from 'react';

const projects = [
  { url: 'https://catherineruiz.com', title: 'Project 1' },
  { url: 'https://Compulogicpc.com', title: 'Project 2' },
  { url: 'https://ruiztechservices.com', title: 'Project 3' },
  { url: 'https://24hourgpt.com', title: 'Project 4' },
  { url: 'https://demon-child.com', title: 'Project 5' },
  { url: 'https://letmeexplain.online', title: 'Project 6' },
  { url: 'https://rrtruckingservices.com', title: 'Project 7' },
  { url: 'https://dont-download.com', title: 'Project 8' },
];

const ProjectViewer = () => {
  return (
    <div className="mx-auto my-auto md:max-w-[700px] w-auto">
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center py-5 space-y-4 space-x-2">
        {projects.map((project, index) => (
          <iframe
            key={index}
            src={project.url}
            title={project.title}
            className="aspect-video shadow-2xl rounded-xl border-2 border-gray-600"
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectViewer;
