import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function AuthButton() {
  return (
    <div>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <button>Sign In</button>
        </Link>
      </SignedOut>
    </div>
  );
}