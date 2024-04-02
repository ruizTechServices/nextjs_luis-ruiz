//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\login\page.js
"use client";
import { useState } from "react";
import Link from "next/link";
import MainFooter from "../components/main/mainFooter";
import supabase from "../utils/supabase/supabaseClient";
import { useRouter } from 'next/router';

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  async function handleLogin(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    let { error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      console.error(error.message);
    } else {
      console.log("Logged in successfully!");
      alert("Yo you signed in!");
      Router.push("/dashboard");
    }
  }


  async function handleGoogleSignIn() {
    let { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  
    if (error) {
      console.error('Google sign-in error:', error.message);
    } else {
      console.log('Signed in with Google successfully!');
      // Handle successful Google sign-in, like redirecting to the dashboard
    }
  }

  async function handleRegister(event) {
    event.preventDefault(); 
    let { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
  
    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      console.log('Registration successful!');
      router.push("/dashboard");
    }
  }
  
  return (
    <>
      <form className="flex justify-center items-center flex-col w-full h-screen">
        {isLogin ? (
          <div className="flex flex-col p-4 border border-gray-200 rounded-lg w-full max-w-xs sm:max-w-md md:max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Login</h2>
            <input
              className="border p-2 mb-2 w-full"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border p-2 mb-2 w-full"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              
            />
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700 w-full mt-4"
              type="button"
              onClick={handleGoogleSignIn}
            >
              {/*This is a Google sign-in button*/}
              Sign in with Google
            </button>
            <p
              className="text-blue-500 cursor-pointer mt-2"
              onClick={toggleForm}
            >
              Don&apos;t have an account? Register
            </p>
          </div>
        ) : (
          <div className="flex flex-col p-4 border border-gray-200 rounded-lg w-full max-w-xs sm:max-w-md md:max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Register</h2>
            <input
              className="border p-2 mb-2 w-full"
              type="text"
              placeholder="Username"
            />
            <input
              className="border p-2 mb-2 w-full"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border p-2 mb-2 w-full"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}

            />
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full"
              type="submit"
              onClick={handleRegister}
            >
              Register
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700 w-full mt-4"
              type="button"
            >
              {/*This is a Google oauth register button*/}
              Register with Google
            </button>
            <p
              className="text-blue-500 cursor-pointer mt-2"
              onClick={toggleForm}
            >
              Already have an account? Login
            </p>
          </div>
        )}
      </form>
      <MainFooter />
    </>
  );
}


export default LoginForm;
