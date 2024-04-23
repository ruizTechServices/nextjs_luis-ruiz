"use client";

import ContactCard from "../components/main/contact/contactInfoCard";


export default function Contact() {
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 bg-gray-100 m-5 shadow-2xl">
    <h1 className="text-4xl font-extrabold text-center md:w-1/2">Provide your contact information and query and I will reach out as soon as possible. </h1>
    <ContactCard />

    </div>
);
}
