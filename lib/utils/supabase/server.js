//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\lib\utils\supabase\server.js
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },//get a cookie by specified name
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {}
        },//set the cookie to authorize actions, etc.
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {}
        },//at logout, or if the session is over(like closed window) then, remove the cookie
      },
    }
  );
}
 