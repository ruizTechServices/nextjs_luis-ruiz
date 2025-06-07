
'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Paragraphs() {
  const currentYear = new Date().getFullYear();
  const age = currentYear - 1988;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Introduction */}
      <div className="text-center mb-12">
        <div className="mb-8 bg-cover bg-center rounded-full w-32 h-32 mx-auto shadow-xl overflow-hidden ring-4 ring-white">
          <Image src="/images/meinasuit.png" alt="Luis Ruiz" width={128} height={128} className="object-cover w-full h-full" />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Luis Giovanni Ruiz</h1>
        <p className="text-xl text-gray-600 italic max-w-2xl mx-auto">"The way of Success is the way of Continuous Pursuit of Knowledge"</p>
        <p className="text-sm text-gray-500 mt-2">- Napoleon Hill</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
          <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
          <div className="text-gray-700 font-medium">Years Experience</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
          <div className="text-3xl font-bold text-green-600 mb-2">7+</div>
          <div className="text-gray-700 font-medium">Years ruizTechServices</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
          <div className="text-3xl font-bold text-purple-600 mb-2">{age}</div>
          <div className="text-gray-700 font-medium">Years Old</div>
        </div>
      </div>

      {/* Main Content Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Professional Background */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Professional Journey</h3>
          </div>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              Seasoned Full-stack Developer and technology entrepreneur with over a decade of hands-on experience in web development, hardware management, and innovative technological solutions.
            </p>
            <p className="leading-relaxed">
              My journey began at <span className="font-semibold text-blue-600">Compulogic</span>, where I specialized in hardware troubleshooting, PCB repairs, and inventory management—experiences that strengthened my analytical skills and adaptability.
            </p>
          </div>
        </div>

        {/* Current Role & Passion */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Current Focus</h3>
          </div>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              Currently employed as a concierge at <span className="font-semibold text-green-600">Royale Company</span>, a role that has honed my interpersonal and problem-solving skills.
            </p>
            <p className="leading-relaxed">
              However, my true passion lies firmly in <span className="font-semibold text-purple-600">programming and computer science</span>. I am eager and highly motivated to transition fully into a technology-driven career.
            </p>
          </div>
        </div>

        {/* Technical Expertise */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Technical Expertise</h3>
          </div>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              As founder of <span className="font-semibold text-purple-600">ruizTechServices</span>, I've spent over seven years developing robust, secure, and user-friendly web applications.
            </p>
            <p className="leading-relaxed">
              Expertise includes <span className="font-semibold">JavaScript, PHP, Next.js, Tailwind CSS, and Supabase</span>. Notable projects include <span className="font-semibold text-blue-600">24HourGPT</span> (AI chatbot platform) and my interactive portfolio site.
            </p>
            <p className="leading-relaxed">
              Extensive experience with authentication systems, payment integration (Square), and multi-tenant database management.
            </p>
          </div>
        </div>

        {/* Education & Growth */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Education & Growth</h3>
          </div>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              <span className="font-semibold text-yellow-600">Bachelor's in Computer Science</span> from University of Phoenix (2018-2023) and technical training from Technical Career Institutes (2016-2017).
            </p>
            <p className="leading-relaxed">
              Recently earned <span className="font-semibold text-blue-600">Cisco certifications</span> in Computer Hardware Basics, demonstrating commitment to expanding technical expertise.
            </p>
            <p className="leading-relaxed">
              Continuously advancing skills to stay ahead of industry trends, always aiming to deliver innovative and practical solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Entrepreneurial Experience */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-white/30">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Diverse Experience</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          My diverse background includes entrepreneurial ventures such as <span className="font-semibold text-indigo-600">Ruiz Home Services</span> (residential handyman service) and extensive experience in delivery and logistics with companies like Postmates, Uber Eats, and Amazon through Cornucopia Delivery Services. This varied experience has given me a unique perspective on customer service, operations management, and business development.
        </p>
      </div>

      {/* Future Goals */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-white/30 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Ready for the Next Challenge</h3>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          I'm eager to bring my extensive experience, relentless curiosity, and enthusiasm for technological innovation to collaborative teams at organizations like <span className="font-semibold text-blue-600">Google</span> or <span className="font-semibold text-green-600">OpenAI</span>, contributing to projects that make meaningful impacts in technology and society.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://www.linkedin.com/in/luis-ruiz-profile" target="_blank" rel="noopener noreferrer" 
             className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Connect on LinkedIn
          </a>
          <a href="https://ruiztechservices.com" target="_blank" rel="noopener noreferrer"
             className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            Visit My Website
          </a>
        </div>
      </div>
    </div>
  );
}
