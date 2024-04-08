//C:\Users\Gio\Desktop\ruizTechServices\websites\nextjs_luis-ruiz\middleware.js 
import { updateSession } from './lib/utils/supabase/middleware';

export async function middleware(request) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
