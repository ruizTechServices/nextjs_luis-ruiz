//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\login\page.js
"use client";
import { useState } from "react";
import MainFooter from "../components/main/mainFooter";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <form className="flex justify-center items-center flex-col w-full h-screen">
        {isLogin ? (
          <div className="flex flex-col p-4 border border-gray-200 rounded-lg w-full max-w-xs sm:max-w-md md:max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Login</h2>
            <input
              className="border p-2 mb-2 w-full"
              id="email"
              name="email"
              type="email"
              required
            />
            <input
              className="border p-2 mb-2 w-full"
              id="password"
              name="password"
              type="password"
              required
            />
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full"
              type="submit"
            >
              Login
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
            />
            <input
              className="border p-2 mb-2 w-full"
              type="password"
              placeholder="Password"
            />
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full"
              type="submit"
            >
              Register
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
