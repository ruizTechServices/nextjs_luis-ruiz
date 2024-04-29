//C:\Users\Gio\Desktop\ruizTechServices\websites\nextjs_luis-ruiz\middleware.js 
import { updateSession } from './lib/utils/supabase/middleware';

export async function middleware(request) {
  return await updateSession(request, () => {
    const token = request.cookies.get("session")?.value;
  });

  const { user, error } = await supabase.auth.api.getUser(token);

  if (user && !error) {
    // Token is valid, so renew it by setting a new cookie
    const cookieOptions = { path: '/', httpOnly: true, secure: true, sameSite: 'lax' };
    request.cookies.set('session', token, cookieOptions);
    return NextResponse.next();
  } else {
    // Token is invalid or expired, redirect to login
    const redirectTo = request.nextUrl.clone();
    redirectTo.pathname = '/login';
    return NextResponse.redirect(redirectTo);
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
