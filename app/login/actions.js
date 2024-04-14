// Path: C:\Users\Gio\Desktop\ruizTechServices\websites\nextjs_luis-ruiz\app\login\actions.js
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import supabase from "../../lib/utils/supabase/supabaseClient";

export async function login(email, password) {
  let session = null;

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  supabase.auth.onAuthStateChange((event, updatedSession) => {
    session = updatedSession;
    console.log("Auth state changed:", event, session);

    if (event === "SIGNED_IN") {
      console.log("User signed in successfully.", session);
      revalidatePath("/dashboard");
      redirect("/dashboard");
    }
  });

  if (error) {
    console.log("Login failed:", error.message);
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
    return;
  }
}

export async function signup(email, password, username) {
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
    const { error: updateError } = await supabase.from('profiles').update({
      username: username
    }).eq('id', user.id);

    if (updateError) {
      console.error('Error updating user metadata:', updateError.message);
    } else {
      console.log("User metadata updated successfully for", username);
    }
  }

  revalidatePath("/check-email");
  redirect("/check-email");
}
