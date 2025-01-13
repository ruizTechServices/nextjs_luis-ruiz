"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../../../lib/utils/supabase/supabaseClient";
import { ContactEntry } from "./contactEntry";
import { motion, AnimatePresence } from "framer-motion";

export const ContactEntriesList = () => {
  const [fetchError, setFetchError] = useState(null);
  const [contactlist, setContactList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchContactList = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("contactlist")
          .select()
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setContactList(data);
      } catch (error) {
        setFetchError(`Could not fetch the Contact List data: ${error.message}`);
      } finally {
        setIsLoading(false);
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

    return () => {
      supabase.removeChannel(myChannel);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 max-w-4xl mx-auto border border-emerald-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-emerald-800">Contact List</h2>
        <div className="flex items-center gap-2">
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-150"></div>
            </div>
          )}
          <span className="text-sm text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full font-medium">
            {contactlist.length} Contacts
          </span>
        </div>
      </div>

      <AnimatePresence>
        {fetchError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 mb-4 rounded"
          >
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              {fetchError}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <div className=" absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-50 pointer-events-none z-10"></div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4 h-[800px] overflow-y-auto pr-4 styled-scrollbar"
        >
          {contactlist.length > 0 ? (
            contactlist.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="transform transition-all duration-200 hover:scale-[1.02]"
              >
                <ContactEntry
                  id={entry.id}
                  fullname={entry.fullname}
                  phone={entry.phone}
                  email={entry.email}
                  message={entry.message}
                />
              </motion.div>
            ))
          ) : !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-emerald-600"
            >
              <svg className="w-16 h-16 mx-auto mb-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-xl font-semibold text-emerald-700">No contacts yet</p>
              <p className="text-sm mt-2 text-emerald-600">Contacts will appear here once added</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <style jsx global>{`
        .styled-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #10B981 #D1FAE5;
        }
        .styled-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .styled-scrollbar::-webkit-scrollbar-track {
          background: #D1FAE5;
          border-radius: 3px;
        }
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background-color: #10B981;
          border-radius: 3px;
          border: 2px solid #D1FAE5;
        }
      `}</style>
    </div>
  );
};
