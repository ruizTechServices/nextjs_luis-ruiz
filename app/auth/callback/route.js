// Import necessary modules
const { createClient } = require('@/utils/supabase/server');
const { NextResponse } = require('next/server');

// Define the GET handler as an asynchronous function
async function GET(request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // Reference: https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/protected`);
}

// Export the GET handler
module.exports.GET = GET;
