// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\mainFooter.js
"use client";
import Footer from "../ui/footer";
import { useState, useEffect, Component } from "react";
import { createClient } from '../../../lib/utils/supabase/supabaseClient';
import { useRouter } from 'next/navigation'; // Correctly import useRouter
const supabase = createClient();

function MainFooter() {
  const [user, setUser] = useState();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Correctly

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

  useEffect(() => {
    const generateLinks = () => {
      const baseLinks = [
        { href: "/", label: "Home" },
        { href: "/contact", label: "Contact" },
        { href: "/services", label: "Services" },
        { href: "/blog", label: "Blog" },
      ];

      if (user === process.env.GIO_DASHBOARD_USER_ID) {
        baseLinks.push({ href: "/dashboard", label: "Daddy's Dashboard" });
      }
      if (user) {
        baseLinks.push({ href: `/user/${user.id}`, label: "Dashboard" });
      }

      setLinks(baseLinks);
    };

    generateLinks();
  }, [user]);

  return (
    <>
      <Footer links={links} />
    </>
  );
}

export default MainFooter;
