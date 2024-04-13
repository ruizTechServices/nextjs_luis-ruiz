//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\mainFooter.js
"use client";
import Footer from "../ui/footer";
import { useState, useEffect } from 'react';
import supabase from './../../../lib/utils/supabase/supabaseClient'; 

function MainFooter() {
  const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/dashboard", label: "Dashboard" },//<===This dashboard must appear ONLY if 'Giosterr44@gmail.com' is logged in.
    { href: "/users", label: "Users" }, //<===This users page must appear ONLY if the registered users are logged in. I also want to display the href as `/users/${userId}` for each user.
    { href: "/about-me", label: "About Me" },
    { href: "/contact", label: "Contact" },
    { href: "/services", label: "Services" },
  ];

  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error('Error fetching session', error);
      else setSession(data.session); 
    };
    fetchSession();
  }, []); 

  if (!session) {
    return (
      <div className="container mx-auto p-8 text-center"> 
        <h2 className='text-2xl font-semibold'>Sorry, you need to be logged in </h2>
        <p>Please log in to access this page</p> 
      </div>
    );
  }

  return (
    // ... your page content
    <Footer links={footerLinks} />  
  );
}

export default MainFooter;
