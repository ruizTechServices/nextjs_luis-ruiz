// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\mainFooter.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Correct import
import Footer from "../ui/footer";
import { createClient } from '../../../lib/utils/supabase/supabaseClient'; // Import a pre-configured Supabase client

function MainFooter() {
  const [user, setUser] = useState();
  const [links, setLinks] = useState([]);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const session = supabase.auth.getSession(); // Get current session directly
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => authListener?.subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    const checkUser = () => {
      if (user && user.id === process.env.GIO_DASHBOARD_USER_ID) {
        router.push("/dashboard");
        return true;
      }
      return false;
    };

    const generateLinks = () => {
      const baseLinks = [
        { href: "/", label: "Home" },
        { href: "/contact", label: "Contact" },
        { href: "/services", label: "Services" },
        { href: "/blog", label: "Blog" },
      ];

      if (user && user.id === 'b3c3e385-af49-4517-bd40-580fa759238b') {
        baseLinks.push({
          href: "/dashboard",
          label: "Daddy's Dashboard",
          onClick: checkUser,
        });
      } else if (user) {
        baseLinks.push({ href: `/user/${user.id}`, label: "Dashboard" });
      }

      setLinks(baseLinks);
    };

    generateLinks();
  }, [user, router]);

  return (
    <>
      <Footer links={links} />
    </>
  );
}

export default MainFooter;