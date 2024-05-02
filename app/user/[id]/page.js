//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\user\[id]\page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "../../../lib/utils/supabase/supabaseClient";
import { CgProfile } from "react-icons/cg";

export default function UserDashboard() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
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
  }, [router, supabase.auth]); // Dependency array includes router

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
    <div className="container mx-auto text-center min-h-screen bg-gray-100 py-10 px-4">
      <main className="max-w-4xl mx-auto p-5 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-5">User&apos;s Dashboard</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="bg-gray-200 p-2 rounded-lg shadow">
            <Image
              src={user.avatar_url || "/images/R.png"} // Fallback for missing avatar
              alt="User Picture"
              width={100}
              height={100}
              className="rounded-full"
            />
            <div className="mt-3">
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="space-y-3">
            <a href="/blog/1" className="text-blue-500 hover:text-blue-700 transition">
              <h3 className="text-xl font-bold">Blog</h3>
            </a>
            <button
              onClick={handleApiCall}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Simulate API Call
            </button>
          </div>
        </div>
        <form>
          <div className="w-full mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-gray-200 p-2 rounded-lg shadow w-full h-[500px]">
              <CgProfile className="text-blue-500" />
              <div className="p-2 mt-3 text-left w-fit bg-white rounded-lg shadow-2xl">
                <h2 className="font-semibold text-lg">Profile</h2>
                  <p>Edit your profile information</p>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Edit Profile
                  </button>
              </div>
            </div>
            <div className="space-y-3">
              <button onClick={logout} className="text-blue-500 hover:text-blue-700 transition">
                <h3 className="text-xl font-bold">Logout</h3>
              </button>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
}
