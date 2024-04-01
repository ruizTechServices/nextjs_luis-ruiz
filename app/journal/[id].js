//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\journal\[id].js
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import supabase from "../../utils/supabase/supabaseClient"; // Ensure this path is correct

export default function JournalEntry() {
  const router = useRouter();
  const { id } = router.query; 
  const [journalEntry, setJournalEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return; 

    const fetchEntry = async () => {
      try {
        let { data, error } = await supabase
          .from("journal")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setJournalEntry(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [router.isReady, id]); // Depend on router.isReady and id

  return (
    <div className="p-4 shadow-md rounded-lg max-w-xl mx-auto my-5">
      {isLoading ? <p>Loading entry...</p> : error ? <p>Error fetching entry: {error}</p> : journalEntry && (
        <>
          <h1 className="text-2xl font-bold mb-3">Journal Entry: {journalEntry.title}</h1>
          <p className="text-gray-700">{journalEntry.content}</p>
        </>
      )}
    </div>
  );
}
