"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data); // Sends data to the console
    router.push("/thank-you"); // Redirects the user to a thank you page
  };

  return (
    <div className="container mx-auto h-[500px] p-5">
      <div className="my-8 mx-auto max-w-md">
        <h1>Contact Luis Ruiz</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
