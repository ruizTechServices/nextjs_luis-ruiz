// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\journalEntryForm.js
"use client";
import { useState } from "react";
import supabase from "../../../../lib/utils/supabase/supabaseClient";

export const JournalEntryForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [journal, setJournal] = useState([]);

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
    <section className="container mx-auto p-4 w-3/4 shadow-2xl m-10 rounded-lg bg-white dark:bg-gray-800">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Form fields */}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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
  );
};
