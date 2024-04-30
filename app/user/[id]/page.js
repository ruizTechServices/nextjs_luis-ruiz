//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\user\[id]\page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "../../../lib/utils/supabase/supabaseClient";

export default function UserDashboard() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        router.push("/login"); // Using Next.js router to redirect
        return;
      }

      setUser(data);
    };

    fetchUser();
  }, [router]); // Dependency array includes router

  if (!user) return null; // Render nothing while user data is loading

  return (
    <div className="container mx-auto text-center h-full">
      <main className="m-10 border border-red-500 rounded-xl p-1 h-[700px]">
        <h1 className="text-4xl font-bold text-center mb-10">
          User&apos;s Dashboard
        </h1>
        <div className="flex flex-wrap justify-center items-center">
          <div>
            <a href="/blog/1" className="text-red-500">
              <h1 className="text-4xl font-bold text-center mb-10">Blog</h1>
            </a>
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 p-4">
              <Image
                src="/images/WCBE0080.jpg"
                alt="User Picture"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{user.name}</div>
                <p className="text-black">{user.email}</p> {/* Displaying user email */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
