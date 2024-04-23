//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\mainFooter.js
"use client";
import Footer from "../ui/footer";
import { useState, useEffect } from "react";

function MainFooter() {
  const [links, setLinks] = useState([]);

  let userLinks = [
            { href: "/", label: "Home" },
            { href: "/about-me", label: "About Me" },
            { href: "/contact", label: "Contact" },
            { href: "/services", label: "Services" },
            { href: "/dashboard", label: "Dashboard" }//<====THis is what I want to toggle hidden and not hidden
          ];  

  return <Footer links={userLinks} />;
}

export default MainFooter;

