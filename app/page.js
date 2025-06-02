// app/page.js
'use client';
import { useState } from "react";
import Image from "next/image";
import HeroSection from "./components/main/heroSection";
import Arrowdown from "./components/ui/arrowdown";
import ProjectViewer from "./components/main/iframe";
import GptStore from "./components/main/gpt_store";
import RolesSection from "./components/rolesSection";
import ScrollToTopArrow from "./components/ui/ScrollToTopArrow";
import Projectai from "./components/main/iframe_ai";
import Skills from "./components/main/skills";
import Publicchatbot from "./components/public_chatbot";
import Soundboard from "./components/main/soundboard";
import Paragraphs from "./components/paragraphs";
import TextToSpeech from "./components/text_to_speech";

const tabs = [
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "Artificial Intelligence", label: "AI" },
  { id: "Public Chatbot", label: "Community Chatbot" },
  { id: "soundboard", label: "Soundboard" },
  { id: "text_to_speech", label: "Text to Speech" }
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("about");
  const currentYear = new Date().getFullYear();
  const age = currentYear - 1988;

  return (
    <main className="min-h-screen bg-white">
      {HeroSection && <HeroSection />}
      {Arrowdown && <Arrowdown />}

      {/* Tabs */}
      <div className="mt-10 overflow-x-auto">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 py-1 sm:px-4 sm:py-2 font-semibold text-sm sm:text-base ${
                activeTab === tab.id
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>


      {/* Tab Content */}
      <div className="mt-8">

        {activeTab === "about" && (
          <>
          <section className="bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 p-10">
            <div className="max-w-4xl mx-auto">
              <Paragraphs />
            </div>
          </section>
          <Skills />
          </>
        )}

        {activeTab === "projects" && (
          <section className="p-10">
            <h2 className="text-4xl font-bold text-center text-black mb-8">
              My Work
            </h2>
            <p className="text-center text-lg text-gray-600 mb-10">
              These are projects that I have completed, or am currently working
              on.
            </p>
            {ProjectViewer && <ProjectViewer />}
          </section>
        )}

        {activeTab === "experience" && (
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
        {activeTab === "Artificial Intelligence" && (
          <section className="p-10">
            <h2 className="text-4xl font-bold text-center text-black mb-8">
              Artificial Intelligence
            </h2>
            <p className="text-center text-lg text-gray-600 mb-10">
              These are AI projects that I have completed, or am currently
              working on.
            </p>
            {ProjectViewer && <Projectai />}
            {GptStore && <GptStore />}
          </section>
        )}
        {activeTab === "Public Chatbot" && (
          <Publicchatbot /> 
        )}
        {activeTab === "soundboard" && <Soundboard />}
        {activeTab === "text_to_speech" && <TextToSpeech />}
      </div>
      <ScrollToTopArrow />
    </main>
  );
}
