import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import signin from "@/assets/signin.webp";
import Image from "next/image";

export const ClerkUserButton = () => {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Image
            src={signin}
            width={30}
            height={30}
            alt="signin"
            className="rounded-full cursor-pointer"
          />
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};
