import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function updateSession(request) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          // Directly set the response cookies without recreating the response object
          request.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          // Remove the cookie by setting its value to an empty string
          request.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Assuming you want to perform some operations with Supabase auth here
  await supabase.auth.getUser();

  // Return a NextResponse object directly without modifications if none needed
  return NextResponse.next();
}
