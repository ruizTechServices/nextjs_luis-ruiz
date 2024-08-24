// app/page.js
"use client";
import { useState } from 'react';
import Image from "next/image";
import HeroSection from "./components/main/heroSection";
import Arrowdown from "./components/ui/arrowdown";
import ProjectViewer from "./components/main/iframe";
import GptStore from "./components/main/gpt_store";
import RolesSection from "./components/rolesSection";
import ScrollToTopArrow from "./components/ui/ScrollToTopArrow";
import Projectai from './components/main/iframe_ai';
import Skills from './components/main/skills';

const tabs = [
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'Artificial Intelligence', label: 'AI' },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <main className="min-h-screen bg-white">
      {HeroSection && <HeroSection />}
      {Arrowdown && <Arrowdown />}

      {/* Tabs */}
      <div className="flex justify-center mt-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-semibold ${
              activeTab === tab.id
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'skills' && (<Skills />)}

        {activeTab === 'about' && (
          <section className="bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 p-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-center text-white mb-4">Luis Ruiz</h1>
              <p className="text-center text-xl mb-8 text-gray-800">New York City Native</p>
              <div className="mb-8 bg-cover bg-center rounded-full w-48 h-48 mx-auto shadow-lg overflow-hidden">
                <Image src="/images/meinasuit.png" alt="Luis Ruiz" width={200} height={200} className="object-cover" />
              </div>
              <p className="text-lg leading-relaxed text-gray-800 mb-8">
                Luis Ruiz, a 35-year-old professional with roots in New York City, currently oversees management operations at ruizTechServices. Demonstrating a strong commitment to community engagement, Luis conducts educational initiatives aimed at enhancing brand visibility and trust.
              </p>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Professional Skills</h3>
              <p className="text-lg text-gray-800 mb-8">
                Luis, with his deep expertise in software development and a profound passion for technology, excels in environments that demand both technical proficiency and customer engagement. His extensive experience spans web design and software development. Additionally, Luis is adept at imparting knowledge, offering both in-person and online instruction.
              </p>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Interests</h3>
              <p className="text-lg text-gray-800">
                Luis finds pleasure in engaging with complex video games like Red Dead Redemption 2, Helldivers 2, and Genshin Impact, which he believes stimulate strategic and analytical thinking. His enthusiasm for programming is driven by a goal to reach a level of expertise where his skills are indispensable to others. So, he studies and practices programming in his free time. He is currently perfecting his design skills, as well.
              </p>
            </div>
          </section>
        )}

        {activeTab === 'projects' && (
          <section className="p-10">
            <h2 className="text-4xl font-bold text-center text-black mb-8">My Work</h2>
            <p className="text-center text-lg text-gray-600 mb-10">
              These are projects that I have completed, or am currently working on.
            </p>
            {ProjectViewer && <ProjectViewer />}
          </section>
        )}

        {activeTab === 'experience' && (
      <section className="flex flex-col lg:flex-row min-h-screen">
        <div className="lg:w-1/2 bg-gradient-to-r from-green-200 via-yellow-100 to-yellow-500 p-8 flex items-center justify-center">
          <div className="max-w-lg">
            <RolesSection />
          </div>
        </div>
        <div className="lg:w-1/2 bg-white p-8 flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/images/luisIT.jpg"
              alt="Luis Ruiz Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
        )}
        {activeTab === 'Artificial Intelligence' && (
          <section className="p-10">
            <h2 className="text-4xl font-bold text-center text-black mb-8">Artificial Intelligence</h2>
            <p className="text-center text-lg text-gray-600 mb-10">
              These are AI projects that I have completed, or am currently working on.
            </p>
            {ProjectViewer && <Projectai />}
            {GptStore && <GptStore />}
          </section>
        )}
      </div>
      <ScrollToTopArrow />
    </main>
  );
}