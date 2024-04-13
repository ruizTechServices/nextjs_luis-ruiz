// Path: C:\Users\Gio\Desktop\ruizTechServices\websites\nextjs_luis-ruiz\app\login\actions.js
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Assuming supabaseClient.js correctly exports an instance of the Supabase client
import supabase from "../../lib/utils/supabase/supabaseClient";

export async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
    return;
  }

  // Redirect to the dashboard upon successful login
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function signup(email, password, username) {
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
    return;
  }

  // Update user metadata with username
  if (user) {
    const { error: updateError } = await supabase.from('profiles').update({
      username: username
    }).eq('id', user.id);

    if (updateError) {
      console.error('Error updating user metadata:', updateError.message);
      // Handle error appropriately
    }
  }

  // After signing up, redirect to check_email to verify the user's email address
  revalidatePath("/check_email");
  redirect("/check_email");
}
