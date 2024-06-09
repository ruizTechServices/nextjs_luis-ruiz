// C:\Users\Gio\OneDrive\Desktop\ruizTechServices\luis-ruiz\nextjs\nextjs_luis-ruiz\app\user\[id]\page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "../../../lib/utils/supabase/supabaseClient";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiHome, FiLogOut, FiSettings, FiUser } from "react-icons/fi";

export default function UserDashboard() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(
    () => {
      const fetchUser = async () => {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          router.push("/login");
          console.log("Redirecting to login due to error:", error);
          return;
        }

        setUser(data);
        console.log("User data fetched successfully:", data);
      };

      fetchUser();
    },
    [router, supabase.auth]
  ); // Dependency array includes router

  if (!user) {
    console.log("User data not loaded yet"); // Inform about data loading state
    return <p>Loading...</p>; // More user-friendly loading state
  }

  // Function to simulate an API call
  const handleApiCall = () => {
    console.log("API call simulation");
    // Simulated API call logic here
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to home after logout
  };

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      {/* Sidebar */}
      <div
        className={`text-black bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${menuOpen
          ? "translate-x-0"
          : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <button
          className="p-4 text-black md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button>
        {/* Logo */}
        <a
          href="/"
          className="text-black text-3xl font-semibold uppercase hover:text-gray-700"
        >
          Logo
        </a>
        {/* Nav Items */}
        <nav className="text-black">
          <a
            href="/"
            className="text-black block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
          >
            <FiHome className="inline-block mr-2" /> Home
          </a>
          <a
            href="/settings"
            className="text-black block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
          >
            <FiSettings className="inline-block mr-2" /> Settings
          </a>
          <a
            href="/profile"
            className="text-black block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
          >
            <FiUser className="inline-block mr-2" /> Profile
          </a>
          <button
            onClick={logout}
            className="text-black block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
          >
            <FiLogOut className="inline-block mr-2" /> Logout
          </button>
        </nav>
      </div>
      {/* Burger */}
      <button
        className={`${menuOpen ? "hidden" : "absolute"} border-2 text-black md:hidden`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FiMenu />
      </button>
      {/* Content Area */}
      <div className="flex-1 p-10 text-2xl font-bold">
        <h1 className="mb-4">Dashboard</h1>
        <div>
          Welcome, {user.email}!
        </div>
      </div>
    </div>
  );
}
