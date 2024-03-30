"use client";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase/supabaseClient";

const Dashboard = () => {
  const [fetchError, setFetchError] = useState(null);
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const { data, error } = await supabase.from("journal").select();

        if (error) {
          setFetchError("Could not fetch the journal data...", error.message);
          setJournal(null);
          console.log(error);
        }
        if (data) {
          setJournal(data);
          setFetchError(null);
        }
      } catch (err) {
        setFetchError(err.message);
      }
    };
    fetchJournal();
  }, []);

  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to your Dashboard</h1>
      </section>
      <section>
        {fetchError && (
          <div className="bg-red-500 text-white p-4 rounded-md">
            <p>{fetchError}</p>
          </div>
        )}
        {journal && (
          <div className="container mx-auto space-y-4 flex flex-col md:flex-row justify-evenly items-center">
            <div className="">
              {journal.map((journal) => (
                <p key={journal.id}>{journal.title}</p>
              ))}
            </div>
            <div className="">
              {journal.map((journal) => (
                <p key={journal.id}>{journal.content}</p>
              ))}
            </div>
          </div>
        )}
      </section>
      <section className="bg-gradient-to-bl from-green-200 via-green-400 to-green-500 text-white p-4">
        <div className="container mx-auto text-center py-4 flex flex-col md:flex-row justify-evenly items-center">
          <a href="/" className="">
            Home
          </a>
          <a href="/dashboard" className="">
            Dashboard
          </a>
          <a href="/about" className="">
            About Me
          </a>
          <a href="/contact" className="">
            Contact
          </a>
          <a href="/services" className="">
            Services
          </a>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
