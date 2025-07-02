// app/dashboard/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "../components/main/dashboardHeader";
import { JournalEntriesList } from "../components/main/journal/journalEntriesList";
import { JournalEntryForm } from "../components/main/journal/journalEntryForm";
import BitcoinPriceClock from "../components/main/bitcoinbot";
import PersonalAssistant from "../../app/components/main/personalAssistant";
import { ContactEntriesList } from "../components/main/contact/contactEntryList";
import { BlogEntryForm } from "../components/main/blog/blogEntryForm";
import CatalogItemForm from "../components/main/catalog/catalogItemForm";
import TodoList from "../components/main/todolist";
import CodepenLikeEditor from "../components/main/component_submissions";
import GPT4Component from "../components/main/openai/gpt-4";
import MarkdownEditor from "../components/MarkdownEditor";
import PhotoUpload from "../components/photoUpload";
import GPT4New from "../components/main/openai/gpt-4-new";
import PhotoUploader from "../components/photoUploader";
import { useUser } from "@clerk/nextjs";
import { isAdminUser, getUserEmail } from "../../lib/auth-client";

function Dashboard() {
  const [contentComponent, setContentComponent] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      console.log("Not signed in. Redirecting to sign-in.");
      router.push("/sign-in");
      return;
    }

    // Check if user is admin (client-side check for UX, server-side is authoritative)
    const isAdmin = isAdminUser(user);
    
    if (!isAdmin) {
      console.log(`Non-admin user attempting dashboard access: ${getUserEmail(user)}`);
      router.push(`/user/${user.id}`);
      return;
    }

    console.log(`Admin access confirmed for: ${getUserEmail(user)}`);
    setIsAuthorized(true);
    setIsCheckingAuth(false);
  }, [isLoaded, isSignedIn, user, router]);

  // Show loading state while checking authentication
  if (!isLoaded || isCheckingAuth) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-xl font-semibold text-gray-700">Verifying admin access...</p>
        <p className="text-sm text-gray-500 mt-2">Brought to you by ruizTechServices</p>
      </div>
    );
  }

  // Show unauthorized message if somehow they get here without proper access
  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50">
        <div className="text-red-600 text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h1>
        <p className="text-red-600 mb-4">You don&apos;t have permission to access this admin dashboard.</p>
        <button 
          onClick={() => router.push(`/user/${user?.id}`)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Your Dashboard
        </button>
      </div>
    );
  }

  const showContent = (contentComponent) =>
    setContentComponent(contentComponent);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Admin indicator */}
      <div className="bg-green-600 text-white text-center py-1 text-sm">
        🔒 Admin Dashboard - {getUserEmail(user)}
      </div>
      
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
              { label: "GPT-4 Mini", component: <GPT4Component /> },
              { label: "Personal Assistant", component: <PersonalAssistant /> },
              { label: "Markdown Editor", component: <MarkdownEditor /> },
              { label: "Photo Upload", component: <PhotoUpload /> },
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
