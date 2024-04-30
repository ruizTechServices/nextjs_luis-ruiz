//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\user\[id]\page.js
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import supabase from "../../../lib/utils/supabase/supabaseClient";

export default function UserDashboard({ params }) {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(params.id);
  const [userEmail, setUserEmail] = useState(params.email);
  const [userImage, setUserImage] = useState(params.image);
  const [userName, setUserName] = useState(params.name);
   
  //get user from Supabase database

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log("Error fetching user: ", error);
        router.push("/login");
      } else {
        setUsers(data);
        setUserId(data.user.id);
        setUserEmail(data.user.email);
        setUserImage(data.user.user_metadata.avatar_url);
        setUserName(data.user.user_metadata.full_name);
      }
    };
    fetchData();
  }, []);


  

  return (
    <>
      <div className="container mx-auto text-center h-full">
        <main className="m-10 border border-red-500 rounded-xl p-1 h-[700px]">
          <h1 className="text-4xl font-bold text-center mb-10">
            {userEmail}&apos;s Dashboard
          </h1>
          <div className="flex flex-wrap justify-center items-center">
            <div>              
              
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
