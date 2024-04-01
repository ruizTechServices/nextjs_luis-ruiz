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

    fetchJournal();
  }, []);

  return (
    <section className="container mx-auto p-4">
      {fetchError && (
        <div className="bg-red-500 text-black p-4 rounded-md">
          <p>{fetchError}</p>
        </div>
      )}
      {journal && (
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
