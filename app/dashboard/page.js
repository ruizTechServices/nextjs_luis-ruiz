//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\dashboard\page.js
"use client";
import { useState } from 'react';
import { DashboardHeader } from "../components/main/dashboardHeader";
import { JournalEntriesList } from "../components/main/journal/journalEntriesList";
import { JournalEntryForm } from "../components/main/journal/journalEntryForm";
import ChatbotForm from "../components/main/chatbot";
import BitcoinPriceClock from "../components/main/bitcoinbot";
import Modal from "../components/ui/modal";
import PersonalAssistant from "../../app/components/main/personalAssistant";
import { ContactEntriesList } from '../components/main/contact/contactEntryList';
import { BlogEntryForm } from '../components/main/blog/blogEntryForm';

function Dashboard() {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (contentComponent) => setModalContent(contentComponent);
  const closeModal = () => setModalContent(null);
  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto w-auto mb-10 flex md:flex-row flex-col justify-center items-center gap-5">
        <button
          onClick={() => openModal(<JournalEntriesList />)}
          className="button rounded-md bg-blue-500 p-5 md:w-auto text-white hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Journal
        </button>
        <button
          onClick={() => openModal(<ContactEntriesList />)}
          className="button rounded-md bg-blue-500 p-5 md:w-auto text-white hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Contact List/Entries
        </button>
        <button
          onClick={() => openModal(<JournalEntryForm />)}
          className="button rounded-md bg-blue-500 p-5 md:w-auto text-white hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Add Journal Entry
        </button>
        <button
          onClick={() => openModal(<PersonalAssistant />)}
          className="button rounded-md bg-blue-500 p-5 md:w-auto text-white hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          My Chatbot!
        </button>
        <button
          onClick={() => openModal(<BitcoinPriceClock />)}
          className="button rounded-md bg-blue-500 p-5 md:w-auto text-white hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Bitcoin Price Status
        </button>
        <button
          onClick={() => openModal(<BlogEntryForm/>)}
          className="button rounded-md bg-blue-500 p-5 md:w-auto text-white hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Blog Entry Form
        </button>
      </div>

      {modalContent && (
        <Modal isOpen={modalContent !== null} closeModal={closeModal}>
          {modalContent}
        </Modal>
      )}
    </>
  );
}

export default Dashboard;
