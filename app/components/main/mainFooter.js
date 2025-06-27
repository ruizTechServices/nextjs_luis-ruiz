// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\mainFooter.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import
import Footer from "../ui/footer";
import { useUser } from "@clerk/nextjs";

function MainFooter() {
  const { user, isSignedIn } = useUser();
  const [links, setLinks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const generateLinks = () => {
      const baseLinks = [
        { href: "/", label: "Home" },
        { href: "/contact", label: "Contact" },
        { href: "/services", label: "Services" },
        { href: "/blog", label: "Blog" },
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/termsofservice", label: "Terms of Service" },
      ];

      if (isSignedIn) {
        // Assuming any signed-in user can access a dashboard
        baseLinks.push({
          href: "/dashboard",
          label: "Dashboard",
        });
        baseLinks.push({
          href: `/user/${user.id}`,
          label: `${user.fullName || user.id}'s Profile`,
        });
      }

      setLinks(baseLinks);
    };

    generateLinks();
  }, [user, isSignedIn, router]);

  return (
    <>
      <Footer links={links} />
    </>
  );
}

export default MainFooter;
