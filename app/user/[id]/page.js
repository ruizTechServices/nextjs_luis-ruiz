// C:\Users\Gio\OneDrive\Desktop\ruizTechServices\luis-ruiz\nextjs\nextjs_luis-ruiz\app\user\[id]\page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "../../../lib/utils/supabase/supabaseClient";
import { FiMenu, FiHome, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import SettingsForm from "../../components/main/user_dash/settingsForm";
import Profile from "../../components/main/user_dash/profile";
import Home from "../../components/main/user_dash/user_home";

export default function UserDashboard() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("home");

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

  // // Function to simulate an API call
  // const handleApiCall = () => {
  //   console.log("API call simulation");
  //   // Simulated API call logic here
  // };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to home after logout
  };

  // Content rendering based on selected menu
  const renderContent = () => {
    switch (selectedMenu) {
      case "home":
        return <Home/>;
      case "settings":
        return <SettingsForm />;      
      case "profile":
        return <Profile/>;
      default:
        return <p>Select a menu option to display its content here.</p>;
    }
  };

  return (
    <div className="flex h-full bg-white text-black">
      {/* Sidebar */}
      <div
        className={`text-black bg-gradient-to-r from-green-200 via-green-100 to-green-500 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${menuOpen
          ? "translate-x-0"
          : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <button
          className="p-4 text-black md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu className="h-[40px] w-[40px] text-black absolute" />
        </button>
        {/* Logo */}
        <a
          href="/"
          className="text-black text-3xl font-semibold uppercase hover:text-gray-700"
        >
          <Image src={"/images/logo_lr.png"} width={200} height={200} />
        </a>
        {/* Nav Items */}
        <nav className="text-black">
          <a
            href="#"
            onClick={() => setSelectedMenu("home")}
            className="text-black block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
          >
            <FiHome className="inline-block mr-2" /> Home
          </a>
          <a
            href="#"
            onClick={() => setSelectedMenu("settings")}
            className="text-black block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
          >
            <FiSettings className="inline-block mr-2" /> Settings
          </a>
          <a
            href="#"
            onClick={() => setSelectedMenu("profile")}
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
        className={`${menuOpen
          ? "hidden"
          : "absolute"} border-2 h-[40px] text-black md:hidden`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FiMenu className="h-[40px] w-[40px] text-black" />
      </button>
      {/* Content Area */}
      <div className="flex-1 p-10">
        <h1 className="mb-4 font-bold text-2xl">Your Personal Dashboard</h1>
        <p className="">
          Here you will find all your personalized information. Also, all work
          that Luis Ruiz will create for you or vice versa, will be displayed on
          this page.
        </p>
        <div className="container mx-auto overflow-hidden bg-white border-2 h-screen rounded-lg shadow-lg">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
