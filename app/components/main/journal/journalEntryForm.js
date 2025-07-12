"use client";
import { useState } from "react";
import { createClient } from "../../../../lib/utils/supabase/supabaseClient";

export const JournalEntryForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [journal, setJournal] = useState([]);
  const supabase = createClient();

  const fetchJournal = async () => {
    try {
      const { data, error } = await supabase.from("journal").select();
      if (error) {
        setFetchError("Could not fetch the journal data...", error.message);
        setJournal([]);
      } else {
        setJournal(data);
        setFetchError(null);
      }
    } catch (err) {
      setFetchError(err.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error } = await supabase
      .from("journal")
      .insert([{ title, content, tags }]);

    if (error) {
      console.error(error);
    } else {
      console.log("Entry added");
      await fetchJournal();
      setTitle("");
      setContent("");
      setTags("");
    }
    
  };

  return (
    <section className="container mx-auto p-6 max-w-2xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl my-10">
  <form className="space-y-6" onSubmit={handleSubmit}>
    <div className="space-y-2">
      <label htmlFor="title" className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition duration-200 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter your journal title"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="content" className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Content
      </label>
      <textarea
        name="content"
        id="content"
        rows="5"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition duration-200 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Write your journal entry here"
      ></textarea>
    </div>
    <div className="space-y-2">
      <label htmlFor="tags" className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Tags
      </label>
      <input
        type="text"
        name="tags"
        id="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition duration-200 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter tags separated by commas"
      />
    </div>
    <button
      type="submit"
      className="w-full py-3 px-6 text-white font-bold bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    >
      Submit Journal Entry
    </button>
  </form>
</section>
  );
};