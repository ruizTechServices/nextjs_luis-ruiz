import React, { useState, useEffect } from 'react';
import { createClient } from '../../../lib/utils/supabase/supabaseClient';
import { useRouter } from 'next/navigation'; // Correctly import useRouter
const supabase = createClient();

const AuthButton = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Correctly instantiate router using useRouter hook

  useEffect(() => {
    // Check active session and set user
    const session = supabase.auth.getSession(); // Make sure you're using the correct method to check the session
    setUser(session?.user ?? null);
    setLoading(false);

    // Subscription to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe(); // Make sure to correctly unsubscribe
    };
  }, []);

  const handleLogin = async () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to home after logout
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? (
    <div>
      <div>Welcome, {user.email}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AuthButton;
