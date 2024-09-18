// Import necessary modules
const { createClient } = require('../../../lib/utils/supabase/server');
const { NextResponse } = require('next/server');

// Define the GET handler as an asynchronous function
async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;
  const supabase = createClient();

  // Try to get session from localStorage (if running on the client-side)
  const cachedSession = localStorage.getItem('supabase-session');
  if (cachedSession) {
    console.log('Session found in localStorage');
    return NextResponse.redirect(`${origin}/protected`);
  }

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }

    // Store the session in localStorage for future use
    localStorage.setItem('supabase-session', JSON.stringify(data.session));

    // Redirect to the protected page after successful authentication
    return NextResponse.redirect(`${origin}/protected`);
  }

  return NextResponse.redirect(`${origin}/login`);
}

// Export the GET handler
module.exports.GET = GET;
