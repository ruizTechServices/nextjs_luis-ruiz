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
import { useRouter } from "next/navigation";
import TodoList from "../components/main/todolist";
import { CodepenLikeEditor } from "../components/main/component_submissions";

function Dashboard() {
  const [contentComponent, setContentComponent] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getLoggedInUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        redirect("/");
      }
      setLoggedInUser(user);
      console.log(loggedInUser);
    };
    getLoggedInUser();
  }, [loggedInUser, supabase]);

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
