'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Paragraphs() {
  const currentYear = new Date().getFullYear();
  const age = currentYear - 1988;

  const slides = [
    `<p className="text-lg leading-relaxed text-gray-800 mb-8">
      <span className="font-bold text-2xl">Luis Ruiz</span>, a ${age}-year-old tech enthusiast originally from New York City, now leads operations at RuizTech Services. With a sharp focus on innovative solutions, Luis enhances business capabilities through AI implementations and advanced cloud technologies.
    </p>`,
    `<h3 className="text-2xl font-bold text-gray-800 mb-4">Professional Skills</h3>
    <p className="text-lg text-gray-800 mb-8">
      Luis, with his vast knowledge in software development and a strong dedication to technology, thrives in roles that require both strategic innovation and client-centric solutions. His expertise includes AI, cloud computing, and full-stack web development. He also enjoys mentoring and educating others in tech, both virtually and in person.
    </p>`,
    `<h3 className="text-2xl font-bold text-gray-800 mb-4">Interests</h3>
    <p className="text-lg text-gray-800">
      Luis takes joy in immersing himself in challenging games like Red Dead Redemption 2, Helldivers 2, and Genshin Impact, appreciating their complex narratives and mechanics. His passion for programming pushes him to constantly refine his skills, striving for a level where his work makes a significant impact on others. He is currently focused on enhancing his design capabilities as well.
    </p>`
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <section className="bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-[80px] font-bold text-center text-black mb-4">Luis Ruiz</h1>
        <p className="text-center text-xl mb-8 text-gray-800">Full-Stack Developer/
          <br/>
          founder of ruizTechServices
        </p>
        <div className="mb-8 bg-cover bg-center rounded-full w-48 h-48 mx-auto shadow-lg overflow-hidden">
          <Image src="/images/meinasuit.png" alt="Luis Ruiz" width={200} height={200} className="object-cover" />
        </div>

        {/* Slideshow */}
        <div className="relative">
          <div className="slide-content text-center text-xl md:text-4xl container mx-auto" dangerouslySetInnerHTML={{ __html: slides[currentSlide] }} />
          <div className="flex justify-between mt-4">
            <button
              onClick={prevSlide}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              onClick={nextSlide}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
    
  );
}
