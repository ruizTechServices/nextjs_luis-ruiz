// lib/utils/sessionUtils.js

export const getSession = () => {
  const cachedSession = localStorage.getItem('supabase-session');
  if (cachedSession) {
    const session = JSON.parse(cachedSession);

    // Check if the session has expired
    if (Date.now() > new Date(session.expires_at).getTime()) {
      console.log('Session expired, clearing from localStorage');
      localStorage.removeItem('supabase-session');
      return null;
    }
    return session;
  }
  return null;
};
