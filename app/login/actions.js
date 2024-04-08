"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Assuming supabaseClient.js correctly exports an instance of the Supabase client
import supabase from "../../lib/utils/supabase/supabaseClient";

export async function login(formData) {
  const data = {
    email: String(formData.get("email")),
    password: String(formData.get("password"))
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
    return;
  }

  // Ensure this path reflects the user's ID appropriately
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function signup(formData) {
  // Use the imported supabase instance directly
  const data = {
    email: String(formData.get("email")),
    password: String(formData.get("password"))
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
    return;
  }

  revalidatePath("/check_email");
  redirect("/check_email");
}