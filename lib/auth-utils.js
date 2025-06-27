// lib/auth-utils.js
// Server-side authentication utilities ONLY
import { auth } from '@clerk/nextjs/server';

// Admin email from environment variable for security
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'giosterr44@gmail.com';

/**
 * Server-side function to check if the current user is an admin
 * This runs on the server and cannot be manipulated by client-side code
 * @returns {Promise<{isAdmin: boolean, userId: string | null, email: string | null}>}
 */
export async function checkAdminAccess() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return { isAdmin: false, userId: null, email: null };
    }

    // Get user data from Clerk
    const { clerkClient } = await import('@clerk/nextjs/server');
    const user = await clerkClient.users.getUser(userId);
    
    if (!user) {
      return { isAdmin: false, userId, email: null };
    }

    const primaryEmail = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId);
    const userEmail = primaryEmail?.emailAddress;

    const isAdmin = userEmail === ADMIN_EMAIL;

    // Log access attempts for security monitoring
    console.log(`Access check - User: ${userEmail}, Admin: ${isAdmin}, Timestamp: ${new Date().toISOString()}`);

    return {
      isAdmin,
      userId,
      email: userEmail
    };
  } catch (error) {
    console.error('Error checking admin access:', error);
    return { isAdmin: false, userId: null, email: null };
  }
}
