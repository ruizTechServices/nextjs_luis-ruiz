// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\mainFooter.js
"use client";
import Footer from "../ui/footer";
import { useState, useEffect } from "react";

function MainFooter() {
  const { user, signOut } = useState();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const generateLinks = () => {
      const baseLinks = [
        { href: "/", label: "Home" },
        { href: "/contact", label: "Contact" },
        { href: "/services", label: "Services" },
        { href: "/blog", label: "Blog" },
      ];

      if (user) {
        baseLinks.push({ href: `/user/${user.id}`, label: "Dashboard" });
        baseLinks.push({ href: "/", label: "Sign Out", onClick: signOut });
      } else {
        baseLinks.push({ href: "/login", label: "Login" });
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
