'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const tabs = [
  "about",
  "projects", 
  "experience",
  "Artificial Intelligence",
  "Public Chatbot",
  "soundboard",
  "text_to_speech",
  "script-projects"
];

export default function TabNavigation({ initialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentTab = searchParams.get('tab') || 'about';
    setActiveTab(currentTab);
  }, [searchParams]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    router.push(`/?tab=${encodeURIComponent(tab)}`, { scroll: false });
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}