//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\lib\utils\supabase\supabaseClient.js

import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
