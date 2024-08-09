// components/main/TabNavigation.js
import React from 'react';
import clsx from 'clsx';

const tabs = [
  { name: "Hero Section", href: "#hero-section", current: true },
  { name: "Skills", href: "#skills", current: false },
  { name: "Work", href: "#work", current: false },
  { name: "About", href: "#about", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TabNavigation({ currentTab, setCurrentTab }) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          defaultValue={tabs.find(tab => tab.current).name}
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => setCurrentTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                onClick={() => setCurrentTab(tab.name)}
                className={classNames(
                  tab.name === currentTab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium',
                )}
                aria-current={tab.name === currentTab ? 'page' : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
