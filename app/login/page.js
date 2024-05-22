//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\login\page.js
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from "../../lib/utils/supabase/supabaseClient";
import SubmitButton from './submitButton';

export default function Login({ params }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const supabase = createClient();

  const router = useRouter();

  const resetPass = () => {
    router.push('/reset_password');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage(''); // Clear any errors when toggling
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const { data, error } = isLogin
        ? await supabase.auth.signInWithPassword({
          email: formData.get('email'),
          password: formData.get('password'),
        })
        : await supabase.auth.signUp({
          email: formData.get('email'),
          password: formData.get('password'),
            //I need to inform the user to check their email after registration and then the link needs to redirect them to the login page
        });

      console.log(data);
      if (error) throw error;
      if (data.user && data.user.email === 'giosterr44@gmail.com') {
        router.push("/dashboard");
      } else if (data.user) {
        router.push(`/user/${data.user.id}`); // Redirect to a user-specific page
      } else {
        throw new Error("User not found after authentication.");
      }
    } catch (error) {
      setErrorMessage(error.error_description || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
        <input
          className="border p-2 w-full mb-4"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mb-4"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isLogin ? (
          <SubmitButton className="rounded-xl" pendingText="Signing In...">Sign In</SubmitButton>
        ) : (
          <SubmitButton className="rounded-xl" pendingText="Signing Up...">Sign Up</SubmitButton>
        )}
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        <div className="mt-4">
          {isLogin ? (
            <>
              <p className="text-blue-500 cursor-pointer" onClick={resetPass}>
                Forgotten your password?
              </p>
              <p className="text-blue-500 cursor-pointer" onClick={toggleForm}>
                Don&apos;t have an account? Register
              </p>
            </>
          ) : (
            <p className="text-blue-500 cursor-pointer" onClick={toggleForm}>
              Already have an account? Login
            </p>
          )}
        </div>
      </form>
      <Link href="/" className="absolute top-4 right-4 text-blue-500">Home</Link>
    </div>
  );
}
