// Path: C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\signout\page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import from 'next/navigation'
import supabase from "../../lib/utils/supabase/supabaseClient";

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    // Function to sign out the user using Supabase
    async function signOutUser() {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        router.push("/login"); // Redirect the user to the login page after successful sign-out
      } else {
        console.error("Error during sign out:", error.message);
        // Optionally, handle the error, perhaps by displaying a message or logging it somewhere
      }
    }

    // Ensure this code runs only on the client side
    signOutUser();
  }, [router]); // Depend on 'router' to ensure it is included in the hook's dependency array

  // Render the UI indicating a sign-out process
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-lg">Signing you out...</p>
      </div>
    </div>
  );
};

export default SignOut;
