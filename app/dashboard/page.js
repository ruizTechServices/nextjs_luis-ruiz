// app/dashboard/page.js
"use client";
import { useState, useEffect } from "react";
import { DashboardHeader } from "../components/main/dashboardHeader";
import { JournalEntriesList } from "../components/main/journal/journalEntriesList";
import { JournalEntryForm } from "../components/main/journal/journalEntryForm";
import BitcoinPriceClock from "../components/main/bitcoinbot";
import PersonalAssistant from "../../app/components/main/personalAssistant";
import { ContactEntriesList } from "../components/main/contact/contactEntryList";
import { BlogEntryForm } from "../components/main/blog/blogEntryForm";
import CatalogItemForm from "../components/main/catalog/catalogItemForm";
import { createClient } from "../../lib/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import TodoList from "../components/main/todolist";
import CodepenLikeEditor from "../components/main/component_submissions";
import MistralChat from "../components/main/mistral";
import GPT4Component from "../components/main/openai/gpt-4";
import MarkdownEditor from "../components/MarkdownEditor";
import PhotoUpload from "../components/photoUpload";
import { getSession } from '../../lib/utils/sessionUtils';
import Chatbot from "../components/chatbot";
import MistralNew from "../components/main/mistral-new";
import GPT4New from "../components/main/openai/gpt-4-new";
import PhotoUploader from "../components/photoUploader";


function Dashboard() {
  const [contentComponent, setContentComponent] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const getLoggedInUser = async () => {
      const session = getSession(); // Use the getSession function here

      if (session) {
        console.log('Using cached session:', session);
        setLoggedInUser(session.user);  // Assume session has user details
      } else {
        // No session in localStorage, fetch from Supabase
        const { data: { user }, error } = await supabase.auth.getUser();
        if (!user) {
          redirect("/");  // Redirect if no user is found
        } else {
          setLoggedInUser(user);  // Set the logged-in user
          // Cache the session after fetching from Supabase
          localStorage.setItem('supabase-session', JSON.stringify(user));
        }
      }
    };

    getLoggedInUser();
  }, []);

  const showContent = (contentComponent) =>
    setContentComponent(contentComponent);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <DashboardHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <nav className="w-full md:w-64 bg-blue-600 text-white p-4 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            {[
              { label: "Add Catalog Item", component: <CatalogItemForm /> },
              { label: "Journal", component: <JournalEntriesList /> },
              { label: "Contact List", component: <ContactEntriesList /> },
              { label: "Add Journal Entry", component: <JournalEntryForm /> },
              { label: "My Chatbot!", component: <PersonalAssistant /> },
              { label: "Bitcoin Price", component: <BitcoinPriceClock /> },
              { label: "Blog Entry Form", component: <BlogEntryForm /> },
              { label: "ToDo List", component: <TodoList /> },
              { label: "Component Design", component: <CodepenLikeEditor /> },
              { label: "Mistral Chat", component: <MistralChat /> },
              { label: "GPT-4 Mini", component: <GPT4Component /> },
              { label: "Personal Assistant", component: <PersonalAssistant /> },
              { label: "Markdown Editor", component: <MarkdownEditor /> },
              { label: "Photo Upload", component: <PhotoUpload /> },
              { label: "Hugging Face", component: <Chatbot /> },
              { label: "Mistral New", component: <MistralNew /> },
              { label: "GPT-4 New", component: <GPT4New /> },
              { label: "Photo Uploader", component: <PhotoUploader /> },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => showContent(item.component)}
                className="btn w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
        <main className="flex-1 p-6 overflow-auto bg-white rounded-lg shadow-lg m-4">
          {contentComponent || (
            <div className="flex items-center justify-center h-full text-2xl text-gray-500">
              Select an option to view content
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

// Add the following Tailwind CSS classes in your global CSS file or directly in the component:
<style jsx>{`
  .btn {
    padding: 10px;
    background: #0070f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .btn:hover {
    background: #005bb5;
  }
`}</style>;
