
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

  return <Footer links={links} />;
}

export default MainFooter;
