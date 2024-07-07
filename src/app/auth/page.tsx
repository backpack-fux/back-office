"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignInModal } from "@/components/siwn";
import { useNeynarContext } from "@neynar/react";
import Cookies from "js-cookie";
// import { NeynarAPIClient } from "@neynar/nodejs-sdk";

// const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

export default function SignInPage() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { user, isAuthenticated } = useNeynarContext();
  const router = useRouter();

  // TODO
  // const neynarUser = async () => {
  //   const Nuser = await client.;
  //   return Nuser;
  // };

  // TODO
  // 1. Get user to sign in
  // 2. Check if user is allowed to generate JWT
  // 3. If allowed, generate JWT
  // 4. If not allowed, show error message

  useEffect(() => {
    if (!user) {
      setIsSignInModalOpen(true);
    } else if (isAuthenticated) {
      // This is NOT prod solution. We need to verify this server-side.
      Cookies.set("auth_token", user.signer_uuid, { expires: 7, secure: true });
      window.location.reload();
    }
  }, [user, router, isAuthenticated]);

  const handleCloseSignInModal = () => {
    if (user) {
      setIsSignInModalOpen(false);
    }
  };

  return <SignInModal isOpen={isSignInModalOpen} onClose={handleCloseSignInModal} />;
}
