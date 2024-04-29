//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\server.js
"use strict";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/lib/utils/supabase/server";
import Cookies from "js-cookie";

const IndexServer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const session = Cookies.get("session");
      if (session) {
        const { user, error } = await supabase.auth.api.getUser(session);
        if (user && !error) {
          console.log("User is logged in", user);
          setIsLoggedIn(true);
        } else {
          console.log("Session is invalid or expired", error);
          setIsLoggedIn(false);
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    };

    checkSession();
  }, [router, supabase]);

  return (
    <div>
      {isLoggedIn ? "User is logged in" : "Not logged in"}
    </div>
  );
};

export default IndexServer;
