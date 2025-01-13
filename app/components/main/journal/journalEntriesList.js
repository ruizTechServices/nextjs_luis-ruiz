"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../../../lib/utils/supabase/supabaseClient";
import { JournalEntry } from "./journalEntry";

export const JournalEntriesList = () => {
  const [fetchError, setFetchError] = useState(null);
  const [journal, setJournal] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const { data, error } = await supabase
          .from("journal")
          .select();
        if (error) throw error;
        setJournal(data);
      } catch (error) {
        setFetchError(`Could not fetch the journal data: ${error.message}`);
      }
    };
    fetchJournal();

    const myChannel = supabase.channel("journal", { presence: true });

    myChannel
      .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
        fetchJournal();
        console.log("Change received!", payload);        
      })
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(myChannel);
    };
  }, []);

  return (
    <section className="overflow-hidden h-auto md:h-[600px] md:overflow-y-auto bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-2xl shadow-lg p-8 transition-all duration-300 ease-in-out">
  {fetchError && (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg animate-pulse transition-all duration-300 ease-in-out">
      <p className="font-medium">{fetchError}</p>
    </div>
  )}
  {journal.length > 0 ? (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 py-8">
      {journal.map((entry) => (
        <div key={entry.id} className="bg-gradient-to-br from-pink-400 to-purple-500 dark:from-indigo-600 dark:to-purple-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-40 border border-opacity-20 border-white">
          <div className="p-6 backdrop-filter backdrop-blur-sm bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-10">
            <JournalEntry
              id={entry.id}
              title={entry.title}
              content={entry.content}
              tags={entry.tags}
            />
          </div>
          <div className="bg-gradient-to-r from-yellow-300 via-green-300 to-blue-400 h-1 w-full"></div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center h-80">
      <p className="text-gray-600 dark:text-gray-300 text-xl font-light italic leading-relaxed max-w-md text-center">
        Your journal awaits. Start capturing your thoughts and reflections to see them come alive here.
      </p>
    </div>
  )}
</section>
  );
};
