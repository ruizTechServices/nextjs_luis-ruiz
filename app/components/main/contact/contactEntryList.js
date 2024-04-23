"use client";
import { useEffect, useState } from "react";
import supabase from "../../../../lib/utils/supabase/supabaseClient";
import { ContactEntry } from "./contactEntry";

export const ContactEntriesList = () => {
  const [fetchError, setFetchError] = useState(null);
  const [contactlist, setContactList] = useState([]);

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
    <section className="w-1/4 border-4 m-5 rounded overflow-scroll">
      {fetchError && (
        <div className="bg-red-500 text-black p-4 rounded-md">
          <p>{fetchError}</p>
        </div>
      )}
      {contactlist.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-xl flex flex-col md:flex-row md:flex-wrap md:justify-around items-center justify-center">
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
