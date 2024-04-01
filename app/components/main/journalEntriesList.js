//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\journalEntriesList.js
import { useEffect, useState } from "react";
import supabase from "../../utils/supabase/supabaseClient";
import { JournalEntry } from "../main/journalEntry";

export const JournalEntriesList = () => {
  const [fetchError, setFetchError] = useState(null);
  const [journal, setJournal] = useState([]);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const { data, error } = await supabase.from("journal").select();
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
        console.log("Change received!", payload);
        fetchJournal();
      })
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(myChannel);
    };
  }, []);

  return (
    <section className="container mx-auto p-4">
      {fetchError && (
        <div className="bg-red-500 text-black p-4 rounded-md">
          <p>{fetchError}</p>
        </div>
      )}
      {journal.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md flex flex-col items-center justify-center">
          {journal.map((entry) => (
            <JournalEntry
              key={entry.id}
              title={entry.title}
              content={entry.content}
            />
          ))}
        </div>
      )}
    </section>
  );
};
