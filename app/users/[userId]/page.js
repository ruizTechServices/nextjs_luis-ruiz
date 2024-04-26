//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\users\[id].js
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

export default function UserDashboard({ params }) {
  const [users, setUsers] = useState([]);
  let user; //get user from Supabase database
  let image = user?.image;
  let userName = user?.name;
  let userEmail = user?.email;

  useEffect(() => { }, []);

  return (
    <>
      <div className="container mx-auto text-center h-full">
        <Head>
          <title>{params.userId}&apos;s Dashboard</title>
          <meta
            name="description"
            content="A modern and responsive users dashboard built with Next.js and Tailwind CSS"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="m-10 border border-red-500 rounded-xl p-1 h-[700px]">
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
                <div className="font-bold text-xl mb-2">{userName}</div>
                <p className="text-gray-700 text-base">{userEmail} </p>
              </div>
            </div>
            <div>
                <a href="/blog/1" className="text-red-500">
                <h1 className="text-4xl font-bold text-center mb-10">
                Blog
                </h1>
              </a>
              <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 p-4">
              <Image
              src="/images/WCBE0080.jpg"
              alt="User Picture"
              width={100}
              height={100}
              className="rounded-full"
              />
              <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{userName}</div>
              <p className="text-gray-700 text-base">{userEmail} </p>
              </div>
              </div>
              
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
