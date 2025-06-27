// lib/auth-client.js
// Client-side authentication utilities (safe for client components)

// Admin email - this is not sensitive information as it's just for UI purposes
const ADMIN_EMAIL = 'giosterr44@gmail.com';

/**
 * Client-side function to check admin status (for UI purposes only)
 * Note: This should NOT be used for security decisions - server-side validation is authoritative
 * @param {Object} user - Clerk user object
 * @returns {boolean}
 */
export function isAdminUser(user) {
  if (!user) return false;
  
  const primaryEmail = user.emailAddresses?.find(email => email.id === user.primaryEmailAddressId);
  return primaryEmail?.emailAddress === ADMIN_EMAIL;
}

/**
 * Get user's primary email address
 * @param {Object} user - Clerk user object
 * @returns {string|null}
 */
export function getUserEmail(user) {
  if (!user) return null;
  
  const primaryEmail = user.emailAddresses?.find(email => email.id === user.primaryEmailAddressId);
  return primaryEmail?.emailAddress || null;
}

/**
 * Secure redirect function that prevents open redirects
 * @param {string} path - The path to redirect to
 * @returns {string} - Safe redirect path
 */
export function getSafeRedirectPath(path) {
  // Ensure the path starts with / and doesn't contain dangerous patterns
  if (!path || !path.startsWith('/')) {
    return '/user';
  }
  
  // Prevent open redirects by ensuring it's a relative path
  if (path.includes('://') || path.startsWith('//')) {
    return '/user';
  }
  
  return path;
}
