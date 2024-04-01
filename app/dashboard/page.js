//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\dashboard\page.js
"use client";
import { useState } from "react";
import MainFooter from "../components/main/mainFooter"; //
import { DashboardHeader } from "../components/main/dashboardHeader"; //
import { JournalEntryForm } from "../components/main/journalEntryForm"; //
import { JournalEntriesList } from "../components/main/journalEntriesList"; //
import Modal from "../components/ui/modal"; //

const Dashboard = () => {
  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <DashboardHeader />
      <JournalEntriesList />
      <div className="container mx-auto w-80 mb-10 flex md:flex-row flex-col justify-center items-center">
        <button
          onClick={openModal}
          className="px-4 py-2 mb-10 text-white bg-blue-500 hover:bg-blue-700 rounded"
        >
          Add Journal Entry
        </button>

        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <JournalEntryForm />
        </Modal>
      </div>
      <MainFooter />
    </>
  );
};

export default Dashboard;
