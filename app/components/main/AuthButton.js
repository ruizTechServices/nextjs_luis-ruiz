
"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

export default function AuthButton() {
  const { isSignedIn, user, isLoaded } = useUser();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700 hidden sm:inline">
          {user?.fullName || user?.emailAddresses?.[0]?.emailAddress}
        </span>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-8 h-8"
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <SignInButton mode="modal">
        <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
          Sign In
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
          Sign Up
        </button>
      </SignUpButton>
    </div>
  );
}
