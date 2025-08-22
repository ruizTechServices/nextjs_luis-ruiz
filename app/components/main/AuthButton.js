
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function AuthButton() {
  return (
    <div className="flex items-center">
      <SignedIn>
        <UserButton 
          afterSignOutUrl="/" 
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
              userButtonPopoverCard: "shadow-lg border border-gray-200"
            }
          }}
        />
      </SignedIn>
      <SignedOut>
        <Link 
          href="/sign-in"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
        >
          Sign In
        </Link>
      </SignedOut>
    </div>
  );
}
