//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\journalEntriesList.js
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
    <section className="">
      {fetchError && (
        <div className="bg-red-500 text-black p-4 rounded-md">
          <p>{fetchError}</p>
        </div>
      )}
      {journal.length > 0 && (
        <div className="dark:bg-gray-800 dark:text-white">
          {journal.map((entry) => (
            <JournalEntry
              key={entry.id}
              id={entry.id}
              title={entry.title}
              content={entry.content}
              tags={entry.tags}
            />
          ))}
        </div>
      )}
    </section>
  );
};
