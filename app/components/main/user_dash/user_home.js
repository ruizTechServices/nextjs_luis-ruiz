"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "../../../../lib/utils/supabase/supabaseClient";

export default function Home() {
  const supabase = createClient();
  const params = useParams();
  const id = params.id;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
        const { data: userData, error } = await supabase.auth.getUser();
        if (error) {
            console.log("Redirecting to login due to error:", error);
            router.push("/login");
            return;
        }
        setUserInfo(userData);
    };
    fetchUser();
}, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-4xl">Welcome to your Home!</p>
      <p>
        Your id is: {id}
      </p>
      <button onClick={() => fetchUser()}>Get user info</button>
      {userInfo &&
        <div>
          <h2>User Information:</h2>
          <p>
            Email: {userInfo.email}
          </p>
          <p>
            User ID: {userInfo.id}
          </p>
          {/* Add more properties as needed (e.g., name, phone, etc.) */}
        </div>}
    </div>
  );
}
