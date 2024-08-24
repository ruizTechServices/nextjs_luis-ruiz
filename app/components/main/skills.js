import React from 'react';
import { IoLogoJavascript } from 'react-icons/io';
import { FaPython, FaHtml5, FaPhp, FaNodeJs, FaReact } from 'react-icons/fa';
import { BiLogoTailwindCss } from 'react-icons/bi';
import { TbBrandNextjs } from 'react-icons/tb';
import { RiSvelteFill } from 'react-icons/ri';
import { FcLinux } from 'react-icons/fc';

const Skills = () => {
  return (
    <>
    <section className="flex flex-col items-center justify-center p-10 text-center text-black">
      <h2 className="md:text-6xl text-4xl font-bold mb-8">
        I code in <span className="text-indigo-600">many</span> programming languages & frameworks.
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {[IoLogoJavascript, FaPython, FaHtml5, BiLogoTailwindCss, FaPhp, FaNodeJs, FaReact, TbBrandNextjs, RiSvelteFill, FcLinux].map((Icon, index) => (
          <div key={index} className="hover:animate-bounce">
            <Icon className="text-6xl" />
          </div>
        ))}
      </div>
    </section>
      <section className="flex flex-col items-center justify-center p-10 text-center text-black">
            <h2 className="md:text-6xl text-4xl font-bold mb-8">
              Versatility at its Best: Mastering Multiple <span className="text-indigo-600">Languages & Frameworks</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <div className="hover:bg-opacity-20 hover:transform hover:scale-105 card border border-gray-300 p-4">
                <IoLogoJavascript className="text-6xl" />
                <p>JavaScript</p>
                <p>Advanced expertise in ES6+, React, and Node.js</p>
              </div>
              <div className="hover:bg-opacity-20 hover:transform hover:scale-105 card border border-gray-300 p-4">
                <FaPython className="text-6xl" />
                <p>Python</p>
                <p>Proficient in Django, Flask, and data analysis</p>
              </div>
              <div className="hover:bg-opacity-20 hover:transform hover:scale-105 card border border-gray-300 p-4">
                <FaHtml5 className="text-6xl" />
                <p>HTML5</p>
                <p>Expert in semantic markup and SEO optimization</p>
              </div>
              <div className="hover:bg-opacity-20 hover:transform hover:scale-105 card border border-gray-300 p-4">
                <BiLogoTailwindCss className="text-6xl" />
                <p>Tailwind CSS</p>
                <p>Specialist in utility-first design principles</p>
              </div>
              <div className="hover:bg-opacity-20 hover:transform hover:scale-105 card border border-gray-300 p-4">
                <FaPhp className="text-6xl" />
                <p>PHP</p>
                <p>Skilled in Laravel and Symfony frameworks</p>
              </div>
              <div className="hover:bg-opacity-20 hover:transform hover:scale-105 card border border-gray-300 p-4">
                <FaNodeJs className="text-6xl" />
                <p>Node.js</p>
                <p>Seamless server-side JavaScript implementations</p>
              </div>
              <div className="hover:bg-opacity-20 hover:transform hover:scale-105 card border border-gray-300 p-4">
                <FaReact className="text-6xl" />
                <p>React</p>
                <p>Innovative library for interactive UIs</p>
              </div>
              <div className="hover:bg-opacity-20 hover:transform hover:scale-105 card border border-gray-300 p-4">
                <TbBrandNextjs className="text-6xl" />
                <p>Next.js</p>
                <p>Optimal React framework for versatile web development</p>
              </div>
              <div className="hover:bg-opacity-20 hover:transform hover:scale-105 card border border-gray-300 p-4">
                <RiSvelteFill className="text-6xl" />
                <p>Svelte</p>
                <p>Modern component framework for efficient apps</p>
              </div>
              <div className="hover:bg-opacity-20 hover:transform hover:scale-105 card border border-gray-300 p-4">
                <FcLinux className="text-6xl" />
                <p>Linux</p>
                <p>Core systems knowledge for robust platform handling</p>
              </div>
            </div>
      </section>

    </>
  );
};

export default Skills;