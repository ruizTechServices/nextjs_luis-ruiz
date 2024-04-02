"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import MainFooter from "../components/main/mainFooter";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {}, []);

  return (
    <>
      <div className="container">
        <Head>
          <title>Users Dashboard</title>
          <meta
            name="description"
            content="A modern and responsive users dashboard built with Next.js and Tailwind CSS"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="">
          <h1 className="text-4xl font-bold text-center mb-10">
            Users Dashboard
          </h1>
          <div className="flex flex-wrap justify-center items-center">
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 p-4">
              <Image
                src="/images/WCBE0080.jpg"
                alt="User Picture"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">name</div>
                <p className="text-gray-700 text-base">Email: </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MainFooter />
    </>
  );
}
