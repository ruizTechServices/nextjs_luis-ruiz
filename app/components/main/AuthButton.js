// Import necessary modules and components
const { createClient } = require('../../../lib/utils/supabase/server');
const Link = require('next/link');
const { redirect } = require('next/navigation');

// Define the AuthButton component
async function AuthButton() {
  const supabase = createClient();

  // Retrieve the user data from supabase
  const { data: { user } } = await supabase.auth.getUser();

  // Define the signOut function
  const signOut = async () => {
    'use server'; // Enables server components features

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  // Render the component based on whether the user is logged in
  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form onSubmit={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}

// Export the AuthButton component as default
module.exports = AuthButton;
