// C:\Users\Gio\OneDrive\Desktop\ruizTechServices\luis-ruiz\nextjs\nextjs_luis-ruiz\app\components\main\user_dash\user_home.js
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "../../../../lib/utils/supabase/supabaseClient";
import ProfilePicture from "../../../components/main/user_dash/pictureProfile";

export default function Home() {
  const supabase = createClient();
  const params = useParams();
  const id = params.id;
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState();


//   useEffect(() => {
//     const fetchUser = async () => {
//         const { data: userData, error } = await supabase.auth.getUser();
//         if (error) {
//             console.log("Redirecting to login due to error:", error);
//             router.push("/login");
//             return;
//         }
//         setUserInfo(userData);
//     };
//     fetchUser();
// }, []);
useEffect(() => {
    const checkSession = async () => {
      const { data: session } = await supabase.auth.getSession();

      if (session) {
        setUser(session.user);
      } else {
        console.log("No active session. Redirecting to login...");
        router.push("/login");
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase.auth]);




const handleSuccess = (url) => {
    console.log('Uploaded successfully:', url);
    // Additional actions such as updating local state or displaying the image
  };

  const handleError = (error) => {
    console.error('Failed to upload:', error);
    // Display error message to user
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-4xl">Welcome to your Home!</p>
      <p>Your ID is: {user?.id} Email: {user?.email}</p>
      <ProfilePicture onSuccess={handleSuccess} onError={handleError} />
      {user && (
        <div>
          <h2>User Information:</h2>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
          {/* Add more properties as needed (e.g., name, phone, etc.) */}
        </div>
      )}
    </div>
  );
}