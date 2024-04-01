//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\dashboard\page.js
"use client";
import MainFooter from "../components/main/mainFooter";//
import { DashboardHeader } from "../components/main/dashboardHeader";//
import { JournalEntryForm } from "../components/main/journalEntryForm";//
import { JournalEntriesList } from "../components/main/journalEntriesList";//

const Dashboard = () => {
  return (
    <>
      <DashboardHeader />
      <JournalEntriesList />
      <JournalEntryForm />
      <MainFooter />
    </>
  );
};

export default Dashboard;
