///The data that goes into this component gets sent to `contactEntryList.js` thru Supabase. basically this is where the user posts their information and contactentrylist is where it is displayed.
"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import supabase from "../../../../lib/utils/supabase/supabaseClient";

export default function ContactCard() {
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [contactlist, setContactList] = useState([]);
  const router = useRouter();

  const fetchContactList = async () => {
    try {
      const { data, error } = await supabase.from("contactlist").select();
      if (error) {
        setFetchError("Could not fetch the Contact List data...", error.message);
        setContactList([]);
      } else {
        setContactList(data);
        setFetchError(null);
      }
    } catch (err) {
      setFetchError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!data.fullname || !data.email || !data.message) { // Correct the field names according to form data keys
        console.error("Please fill out all required fields.");
        return;
    }

    const { error } = await supabase
        .from("contactlist")
        .insert([{ fullname: data.fullname, phone: data.phone, email: data.email, message: data.message }]);

    if (error) {
        console.error(error.message);
    } else {
        console.log("Entry added");
        await fetchContactList();
        setFullName("");
        setPhone("");
        setEmail("");
        setMessage("");
        router.push("/thank-you"); // Redirect only on successful insert
    }
};


  return (
    <div className="container mx-auto h-auto p-5">
      <div className="my-8 mx-auto max-w-md">
        <h1 className="font-bold text-center p-3">Contact Me, Luis Ruiz, with your request and questions here.</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Fullname:
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              required
              maxLength="500"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
