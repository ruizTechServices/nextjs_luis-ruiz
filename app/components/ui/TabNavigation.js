// components/ui/TabNavigation.js (Client Component)
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const tabs = [
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "Artificial Intelligence", label: "AI" },
  { id: "Public Chatbot", label: "Community Chatbot" },
  { id: "soundboard", label: "Soundboard" },
  { id: "text_to_speech", label: "Text to Speech" },
  { id: "script-projects", label: "Script Projects" }
];

export default function TabNavigation({ initialTab = 'about' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const router = useRouter();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    router.push(`?tab=${tabId}`, { scroll: false });
  };

  return (
    <div className="mt-10">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-0.5 sm:space-x-1 justify-start sm:justify-center min-w-max sm:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                relative px-3 py-2.5 sm:px-5 sm:py-3 
                text-sm sm:text-base font-medium
                transition-all duration-200 ease-out
                whitespace-nowrap
                ${activeTab === tab.id
                  ? "text-gray-900 bg-gray-900/5"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-900/3"
                }
              `}
            >
              {tab.label}
              <div className={`
                absolute bottom-0 left-0 right-0 h-0.5 
                transition-all duration-200 ease-out
                ${activeTab === tab.id
                  ? "bg-gray-900 scale-x-100"
                  : "bg-transparent scale-x-0"
                }
              `} />
            </button>
          ))}
        </div>
      </div>
      <div className="flex sm:hidden justify-center mt-4 space-x-1">
        {tabs.map((tab) => (
          <div
            key={`dot-${tab.id}`}
            className={`
              w-1 h-1 rounded-full transition-all duration-200
              ${activeTab === tab.id ? "bg-gray-900 w-4" : "bg-gray-300"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
