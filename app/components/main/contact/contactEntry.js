"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const ContactEntry = ({ id, fullname, phone, email, message }) => {
  const [contactVisible, setContactVisible] = useState(false);

  return (
    <motion.div 
      className="bg-gradient-to-r from-emerald-100 via-white to-emerald-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-col items-center space-y-4">
        <h3 className="text-xl font-semibold text-emerald-700">{fullname}</h3>
        
        <div className="w-full max-w-md">
          <motion.button
            className="w-full group relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-green-400 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setContactVisible(!contactVisible)}
          >
            <span className="relative z-10">
              {contactVisible ? 'Hide Details' : 'Show Details'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {contactVisible && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-4 bg-white rounded-xl border border-emerald-200 shadow-inner"
            >
              <div className="space-y-2">
                <p className="flex items-center text-emerald-700">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {phone}
                </p>
                <p className="flex items-center text-emerald-700">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {email}
                </p>
                {message && (
                  <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
                    <p className="text-emerald-600 italic">{message}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
