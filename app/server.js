"use strict";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/lib/utils/supabase/server";
import Cookies from "js-cookie";

const IndexServer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const { user } = router.query;
  const supabase = createClient(user);
  const { data, error } = supabase.from("users").select("*");
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }

  const userId = Cookies.get("userId");
  useEffect(() => {
    if (userId) {
      console.log("User ID from cookie:", userId);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userId]);

  return { isLoggedIn };
};

export default IndexServer;
