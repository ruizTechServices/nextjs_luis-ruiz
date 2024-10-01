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
    <div className="flex flex-col h-full">
      <DashboardHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <nav className="w-full md:w-64 bg-blue-400 text-white p-4 flex flex-col gap-2">
          <button
            onClick={() => showContent(<CatalogItemForm />)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            Add Catalog Item
          </button>
          <button
            onClick={() => showContent(<JournalEntriesList />)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            Journal
          </button>
          <button
            onClick={() => showContent(<ContactEntriesList />)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            Contact List/Entries
          </button>
          <button
            onClick={() => showContent(<JournalEntryForm />)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            Add Journal Entry
          </button>
          <button
            onClick={() => showContent(<PersonalAssistant />)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            My Chatbot!
          </button>
          <button
            onClick={() => showContent(<BitcoinPriceClock />)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            Bitcoin Price Status
          </button>
          <button
            onClick={() => showContent(<BlogEntryForm />)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            Blog Entry Form
          </button>
          <button
            onClick={() => showContent(<TodoList />)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            ToDo List
          </button>
          <button
            onClick={() => showContent(<CodepenLikeEditor />)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            Component Design & submission
          </button>
          <button
            onClick={() => showContent(<MistralChat />)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            Mistral Chatbot
          </button>
          <button
            onClick={() => showContent(<GPT4Component/>)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            GPT-4o-mini Chatbot
          </button>
          <button
            onClick={() => showContent(<PersonalAssistant/>)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            Personal Assistant
          </button>
          <button
            onClick={() => showContent(<MarkdownEditor/>)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            MarkdownEditor
          </button>
          <button
            onClick={() => showContent(<PhotoUpload/>)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
            Uploader
          </button>
          <button
            onClick={() => showContent(<Chatbot/>)}
            className="btn w-full border-2 border-white rounded-2xl drop-shadow-2xl"
          >
           Hugging Face
          </button>
        </nav>
        <div className="flex-1 h-[300px] bg-white p-4 overflow-auto h-[700px] md:h-auto">
          {contentComponent}
        </div>
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
