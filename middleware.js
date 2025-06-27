import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/user(.*)',
]);

// Admin email from environment variable for security
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'giosterr44@gmail.com';

export default clerkMiddleware(async (auth, req) => {
  // Check if this is a protected route
  if (isProtectedRoute(req)) {
    const { userId } = auth();
    
    // If user is not authenticated, redirect to sign-in
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Special handling for dashboard route - admin only
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      try {
        // Get user data from Clerk
        const { clerkClient } = await import('@clerk/nextjs/server');
        const user = await clerkClient.users.getUser(userId);
        
        if (!user) {
          console.log(`Dashboard access denied - User not found: ${userId}`);
          return NextResponse.redirect(new URL(`/user/${userId}`, req.url));
        }

        const primaryEmail = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId);
        const userEmail = primaryEmail?.emailAddress;

        // Log access attempt for security monitoring
        console.log(`Dashboard access attempt - User: ${userEmail}, Timestamp: ${new Date().toISOString()}`);

        // Only allow admin email to access dashboard
        if (userEmail !== ADMIN_EMAIL) {
          console.log(`Dashboard access denied - Non-admin user: ${userEmail}`);
          return NextResponse.redirect(new URL(`/user/${userId}`, req.url));
        }

        console.log(`Dashboard access granted - Admin user: ${userEmail}`);
      } catch (error) {
        console.error('Error checking dashboard access:', error);
        // On error, redirect to user dashboard for security
        return NextResponse.redirect(new URL(`/user/${userId}`, req.url));
      }
    }
  }

  // Continue with the request
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};