"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const signOutUser = async () => {
      let { error } = await supabase.auth.signOut();
      if (!error) {
        router.push("/signin");
      }
      // Handle error if needed
    };

    signOutUser();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-lg">Signing you out...</p>
      </div>
    </div>
  );
}
