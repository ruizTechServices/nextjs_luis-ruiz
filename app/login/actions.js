//C:\Users\Gio\Desktop\ruizTechServices\websites\nextjs_luis-ruiz\app\login\actions.js
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Assuming supabaseClient.js correctly exports an instance of the Supabase client
import supabase from "../../lib/utils/supabase/supabaseClient";

export async function login(formData) {
  // Directly use formData parameter to extract email and password
  const data = {
    email: String(formData.get("email")),
    password: String(formData.get("password"))
  };
  //where is the data being sent to??
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
    return;
  }

  // Redirect to the dashboard upon successful login
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function signup(formData) {
  const data = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    phone: String(formData.get("phone")) // Assuming you have a 'phone' field in your form
  };

  const { user, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password
  });

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
    return;
  }

  // Update user metadata with phone number
  if (user) {
    const { error: updateError } = await supabase.from('profiles').update({
      phone: data.phone
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

