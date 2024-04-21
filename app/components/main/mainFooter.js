//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\mainFooter.js
"use client";
import Footer from "../ui/footer";
import { useState, useEffect } from "react";
// import supabase from "./../../../lib/utils/supabase/supabaseClient";


function MainFooter() {
  const [links, setLinks] = useState([]);

  let userLinks = [
            { href: "/", label: "Home" },
            { href: "/about-me", label: "About Me" },
            { href: "/contact", label: "Contact" },
            { href: "/services", label: "Services" },
            { href: "/dashboard", label: "Dashboard" }//<==This is for testing purposes. Delete on production!!
            // { href: "/signout", label: "Signout" }//<===This is conditional, if there is a user signed up, then, this shows up.
          ];

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const { data, error } = await supabase.auth.getSession();
  //     if (error) {
  //       console.error("Error fetching session", error);
  //       return;
  //     }
  
  //     const session = data.session;
  //     if (session) { 
  //       const user = session.user; 
  //       let userLinks = [
  //         { href: "/", label: "Home" },
  //         { href: "/about-me", label: "About Me" },
  //         { href: "/contact", label: "Contact" },
  //         { href: "/services", label: "Services" },
  //         { href: "/signout", label: "Signout" }
  //       ];
  
  //       if (user.email === "Giosterr44@gmail.com") { 
  //         userLinks.push({ href: "/dashboard", label: "Dashboard" });
  //       } else if (user.id) { 
  //         userLinks.push({ href: `/users/${user.id}`, label: "User Profile" });
  //       }
  
  //       setLinks(userLinks);
  
  //    } else { 
  //       setLinks([
  //         { href: "/", label: "Home" },
  //         { href: "/login", label: "Login" },
  //         { href: "/about-me", label: "About Me" },
  //         { href: "/contact", label: "Contact" },
  //         { href: "/services", label: "Services" },
  //       ]);
  //     }
  //   };
  //   fetchSession();
  // }, []);
  

  return <Footer links={userLinks} />;
}

export default MainFooter;


//I want to hide the dashboard link if the user is not an admin
// let userLinks = userLinks.filter(
//   (link) => link.href !== "/dashboard" || user?.email === "giosterr44@gmail.com"
// );

