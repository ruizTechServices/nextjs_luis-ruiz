// Import the required module from "next/server"
const { updateSession } = require("./lib/utils/supabase/middleware");

// Define the middleware function
async function middleware(request) {
  return await updateSession(request);
}

// Export the middleware function
module.exports.middleware = middleware;

// Configuration object to specify matcher rules
const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

// Export the configuration
module.exports.config = config;
