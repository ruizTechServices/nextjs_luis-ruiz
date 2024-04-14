//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\dashboard\page.js
"use client";
import { useState, useEffect } from "react";
import { DashboardHeader } from "../components/main/dashboardHeader"; //
import { JournalEntryForm } from "../components/main/journal/journalEntryForm"; //
import { JournalEntriesList } from "../components/main/journal/journalEntriesList"; //
import Modal from "../components/ui/modal"; //
import supabase from "../../lib/utils/supabase/supabaseClient";
import { ChatbotForm } from "../components/main/chatbot";
import BitcoinPriceClock from "../components/main/bitcoinbot";

const Dashboard = () => {
  // State to manage the visibility of modals
  const [modalContent, setModalContent] = useState(null);
  // Function to open a modal with specific content
  const openModal = (contentComponent) => setModalContent(contentComponent);
  // Function to close the modal
  const closeModal = () => setModalContent(null);
  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  // const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  // const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <DashboardHeader />
      <JournalEntriesList />
      {/* <div className="container mx-auto w-80 mb-10 flex md:flex-row flex-col justify-center items-center">
        <button
          onClick={openModal}
          className="px-4 py-2 mb-10 text-white bg-blue-500 hover:bg-blue-700 rounded"
        >
          Add Journal Entry
        </button>

        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <JournalEntryForm />{/*Add Personal Journal Entries
        </Modal>
      </div> */}

      <div className="container mx-auto w-80 mb-10 flex md:flex-row flex-col justify-center items-center gap-5">
        <button
          onClick={() => openModal(<JournalEntryForm />)}
          className="px-4 py-2 mb-10 text-white bg-blue-500 hover:bg-blue-700 rounded"
        >
          Add Journal Entry
        </button>
        <button
          onClick={() => openModal(<ChatbotForm />)}
          className="px-4 py-2 mb-10 text-white bg-blue-500 hover:bg-blue-700 rounded"
        >
          My Chatbot!
        </button>
        <button
          onClick={() => openModal(<BitcoinPriceClock />)}
          className="px-4 py-2 mb-10 text-white bg-blue-500 hover:bg-blue-700 rounded"
        >
          Bitcoin Price Status
        </button>
        {/* Add other buttons for different modals here as needed */}
      </div>

      {/* A single Modal that dynamically changes its content */}
      {modalContent && (
        <Modal isOpen={modalContent !== null} closeModal={closeModal}>
          {modalContent}
        </Modal>
      )}
    </>
  );
};

export default Dashboard;

//Put these later
{
  /* <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <ChatbotForm />{/*ChatBot
        </Modal> --------------------------DONE*/
}
{
  /* <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <JournalEntryForm />{/*Bitcoin Price Status*
        </Modal> */
}
{
  /* <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <JournalEntryForm />{/*Recent World News
        </Modal> */
}
{
  /* <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <JournalEntryForm />{/*Recent AI News
        </Modal> */
}
{
  /* <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <JournalEntryForm />{/*Recent Tech News
        </Modal> */
}
{
  /* <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <JournalEntryForm />{/*GioJS Twitter Bot
        </Modal> */
}
{
  /* <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <JournalEntryForm />{/*ruizTechServices Twitter Bot
        </Modal> */
}
{
  /* <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <JournalEntryForm />{/*Medium Blog Post
        </Modal> */
}
{
  /* <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <JournalEntryForm />{/*Luis-Ruiz.com blog Post
        </Modal> */
}
