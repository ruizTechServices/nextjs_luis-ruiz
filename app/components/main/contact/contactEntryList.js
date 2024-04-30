"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../../../lib/utils/supabase/supabaseClient";
import { ContactEntry } from "./contactEntry";

export const ContactEntriesList = () => {
  const [fetchError, setFetchError] = useState(null);
  const [contactlist, setContactList] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchContactList = async () => {
      try {
        const { data, error } = await supabase
          .from("contactlist")
          .select();
        if (error) throw error;
        setContactList(data);
      } catch (error) {
        setFetchError(`Could not fetch the Contact List data: ${error.message}`);
      }
    };
    fetchContactList();

    const myChannel = supabase.channel("contactlist", { presence: true });

    myChannel
      .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
        fetchContactList();
        console.log("Change received!", payload);        
      })
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(myChannel);
    };
  }, []);

  return (
    <section className="h-[250px] flex border-4 rounded overflow-scroll">
      {fetchError && (
        <div className="bg-red-500 text-black p-4 rounded-md">
          <p>{fetchError}</p>
        </div>
      )}
      {contactlist.length > 0 && (
        <div className="dark:bg-gray-800 dark:text-white">
          {contactlist.map((entry) => (
            <ContactEntry
              key={entry.id}
              id={entry.id}
              fullname={entry.fullname}
              phone={entry.phone}
              email={entry.email}
              message={entry.message}
            />
          ))}
        </div>
      )}
    </section>
  );
};
