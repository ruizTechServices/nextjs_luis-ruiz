// app/api/auth/check-admin/route.js
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Admin email - should be moved to environment variable for production
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'giosterr44@gmail.com';

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { isAdmin: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user data from Clerk
    const { clerkClient } = await import('@clerk/nextjs/server');
    const user = await clerkClient.users.getUser(userId);
    
    if (!user) {
      return NextResponse.json(
        { isAdmin: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const primaryEmail = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId);
    const userEmail = primaryEmail?.emailAddress;

    const isAdmin = userEmail === ADMIN_EMAIL;

    // Log access check for security monitoring
    console.log(`Admin check API - User: ${userEmail}, Admin: ${isAdmin}, Timestamp: ${new Date().toISOString()}`);

    return NextResponse.json({
      isAdmin,
      userId,
      email: userEmail
    });

  } catch (error) {
    console.error('Error in admin check API:', error);
    return NextResponse.json(
      { isAdmin: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
