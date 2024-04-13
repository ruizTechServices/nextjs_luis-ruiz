//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\signout\page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../lib/utils/supabase/supabaseClient";

export default function SignOut() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark component as being mounted in a client environment
    setIsClient(true);
    if (!isClient) return; // Ensure that sign-out logic only runs on the client side

    const signOutUser = async () => {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        router.push("/signin");
      } else {
        // Optionally handle the error, perhaps by displaying a message
        console.error("Error during sign out:", error.message);
      }
    };

    signOutUser();
  }, [isClient, router]);

  if (!isClient) {
    // Optionally render a loading indicator or nothing while waiting for the client environment
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-lg">Signing you out...</p>
      </div>
    </div>
  );
}
