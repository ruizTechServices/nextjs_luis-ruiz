//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\mainFooter.js
"use client";
import Footer from "../ui/footer";
import { useState, useEffect } from "react";
import supabase from "./../../../lib/utils/supabase/supabaseClient";


function MainFooter() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session", error);
        return;
      }
      const session = data.session;
      const user = session?.user;

      if (user) {
        let userLinks = [
          { href: "/", label: "Home" },
          { href: "/about-me", label: "About Me" },
          { href: "/contact", label: "Contact" },
          { href: "/services", label: "Services" },
          { href: "/signout", label: "Signout" }
        ];
        if (user.email === "Giosterr44@gmail.com") {
          userLinks.push({ href: "/dashboard", label: "Dashboard" });
        } else if (user.id) {
          userLinks.push({ href: `/users/${user.id}`, label: "User Profile" });
        }
        setLinks(userLinks);
      } else {
        setLinks([
          { href: "/", label: "Home" },
          { href: "/login", label: "Login" },
          { href: "/about-me", label: "About Me" },
          { href: "/contact", label: "Contact" },
          { href: "/services", label: "Services" },
        ]);
      }
    };
    fetchSession();
  }, []);

  return <Footer links={links} />;
}

export default MainFooter;
