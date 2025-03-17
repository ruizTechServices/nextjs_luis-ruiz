// Path: C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\signout\page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import from 'next/navigation'
import { createClient} from "../../lib/utils/supabase/supabaseClient";

const SignOut = () => {
  const router = useRouter();
  const supabase = createClient();

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
  }, [router, supabase.auth]); // Include both router and supabase.auth in dependencies

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
