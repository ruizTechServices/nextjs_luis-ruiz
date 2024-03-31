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
      {/* */}
      <section className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-4xl font-bold mb-4">
          Hey, Giovanni! Welcome to your Dashboard
        </h1>
      </section>
      {/* fetch journal entries */}
      <section className="container mx-auto p-4">
        {fetchError && (
          <div className="bg-red-500 text-black p-4 rounded-md">
            <p>{fetchError}</p>
          </div>
        )}
        {journal && (
          <div className="">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md flex flex-col items-center justify-center">
              {journal.map((journal) => (
                <div
                  key={journal.id}
                  className="w-1/2 p-4 border-2 rounded-lg shadow-xl mb-5"
                >
                  <p className="text-xl font-bold">{journal.title}</p>
                  <p className="italic">{journal.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      {/* Add new journal entry form */}
      <section className="container mx-auto p-4 w-3/4 shadow-2xl m-10 rounded-lg bg-white dark:bg-gray-800">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              name="content"
              id="content"
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-400 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Separate tags with commas"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-2xl text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </section>

      {/* footer */}

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
