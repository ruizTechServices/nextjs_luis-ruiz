//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\mainFooter.js
"use client";
import Footer from "../ui/footer";
import { useState, useEffect } from "react";

function MainFooter() {
  const [links, setLinks] = useState([]);
  const [isDashboardVisible, setIsDashboardVisible] = useState(false); // Initial visibility set to false

  let userLinks = [
    { href: "/", label: "Home" },
    { href: "/about-me", label: "About Me" },
    { href: "/contact", label: "Contact" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/login", label: "Login" }
  ];

  // dashboard link visibility logic
  if (isDashboardVisible) {
    userLinks.push({ href: "/dashboard", label: "Dashboard" }); // Conditionally add the Dashboard link
  }

  const toggleDashboardVisibility = () => {
    setIsDashboardVisible(!isDashboardVisible); // Toggle the visibility state
  };

  return (
    <>
      {/* dashboard link visibility logic */}
      {/* So, I commented out the dashboard link visibility logic because I want the dashboard to be visible when a specific user is signed in. I want to be able to have the backend check if there is a user logged in. If there is, check if the user's email is 'giosterr44@gmail.com'. if it is, then, display '/dashboard'. If it isn't, don't display anything. */}
      {/* <button onClick={toggleDashboardVisibility} className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700">
        Toggle Dashboard
      </button> */}
      <Footer links={userLinks} />
    </>
  );
}

export default MainFooter;
