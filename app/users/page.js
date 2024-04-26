//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\users\[id].js
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Dashboard({ params }) {
  const [users, setUsers] = useState([]);
  let user; //get user from Supabase database
  let image = user?.image;
  let name = user?.name;

  useEffect(() => { }, []);

  return (
    <>
      <div className="container">
        <Head>
          <title>List of Users</title>
          <meta
            name="List of Users"
    content="This is a list of users"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="">
          <h1 className="text-4xl font-bold text-center mb-10">
            List of Users
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
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base">Email: </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
