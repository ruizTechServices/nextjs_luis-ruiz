// Path: C:\Users\Gio\Desktop\ruizTechServices\websites\nextjs_luis-ruiz\app\login\actions.js
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/utils/supabase/server";

export async function login(email, password) {
  const supabase = createClient();
  let session = null;

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  const authStateChangeHandler = (event, updatedSession) => {
    session = updatedSession;
    console.log("Auth state changed:", event, session);

    if (event === "SIGNED_IN") {
      console.log("User signed in successfully.", session);
      revalidatePath("/dashboard");
      redirect("/dashboard");
       // Check for token expiration and schedule a refresh
       setTimeout(() => {
        // This will automatically call the Supabase function to refresh the session
        supabase.auth.refreshSession();
      }, (session.expires_in - 60) * 1000); // Refresh 1 minute before token expires
    }
  };

  supabase.auth.onAuthStateChange(authStateChangeHandler);

  if (error) {
    console.log("Login failed:", error.message);
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
    return;
  }
}

export async function signup(email, password) {
  const supabase = createClient();
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Signup failed:", error.message);
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
    return;
  }

  if (user) {
    console.log("Signup successful:", user);
    redirect("/check-email");
  }
}
