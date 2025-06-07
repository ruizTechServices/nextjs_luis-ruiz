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