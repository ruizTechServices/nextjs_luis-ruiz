'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Paragraphs() {
  const currentYear = new Date().getFullYear();
  const age = currentYear - 1988;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Luis Giovanni Ruiz</h1>
        <p className="text-xl text-gray-600 italic">"The way of Success is the way of Continuous Pursuit of Knowledge" - Napoleon Hill</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed text-gray-700">
          Hello, I'm Luis Giovanni Ruiz, a seasoned Full-stack Developer and technology entrepreneur with over a decade of hands-on experience in web development, hardware management, and innovative technological solutions. My journey began with a strong foundation at Compulogic, where I specialized in hardware troubleshooting, PCB repairs, and inventory management—experiences that strengthened my analytical skills and adaptability.
        </p>

        <p className="text-lg leading-relaxed text-gray-700">
          Currently, I am employed as a concierge at Royale Company, a role that has honed my interpersonal and problem-solving skills, but my true passion lies firmly in programming and computer science. I am eager and highly motivated to transition fully into a technology-driven career, dedicating myself entirely to innovation and software development.
        </p>

        <p className="text-lg leading-relaxed text-gray-700">
          As the founder of ruizTechServices, I've spent over seven years developing robust, secure, and user-friendly web applications using JavaScript, PHP, Next.js, and modern frameworks such as Tailwind CSS and Supabase. Projects such as `24HourGPT`, a cutting-edge AI chatbot platform, and my interactive portfolio site `Luis-Ruiz.com`, highlight my ability to integrate complex technologies into seamless user experiences. Additionally, I possess extensive experience with authentication systems, payment integration using platforms like Square, and multi-tenant database management, which positions me well to contribute immediately to demanding, high-performance tech teams.
        </p>

        <p className="text-lg leading-relaxed text-gray-700">
          My diverse background includes entrepreneurial ventures such as Ruiz Home Services, where I operated a residential handyman service, and extensive experience in delivery and logistics with companies like Postmates, Uber Eats, and Amazon through Cornucopia Delivery Services. This varied experience has given me a unique perspective on customer service, operations management, and business development.
        </p>

        <p className="text-lg leading-relaxed text-gray-700">
          I pride myself on continuously advancing my skills to stay ahead of industry trends, always aiming to deliver solutions that are both innovative and practical. Recently, I've earned certifications from Cisco in Computer Hardware Basics, demonstrating my commitment to expanding my technical expertise. I'm now eager to bring my extensive experience, relentless curiosity, and enthusiasm for technological innovation to collaborative teams at organizations like Google or OpenAI, contributing to projects that make meaningful impacts in technology and society.
        </p>

        <p className="text-lg leading-relaxed text-gray-700">
          With a Bachelor's degree in Computer Science from University of Phoenix (2018-2023) and technical training from Technical Career Institutes (2016-2017), I combine formal education with real-world experience. I am currently open to new opportunities and collaborations in the tech industry, so please feel free to connect with me on LinkedIn or through my website at ruiztechservices.com.
        </p>
      </div>
    </div>
  );
}

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
