"use client";

import { useNeynarContext } from "@neynar/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SignInModal } from "@/components/siwn";
import { useAuthHooks } from "@/hooks/usePylonHooks";

export default function SignInPage() {
  const { generateFarcasterJWT, isLoading, error } = useAuthHooks();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { user, isAuthenticated } = useNeynarContext();
  const router = useRouter();

  useEffect(() => {
    const generateToken = async (signer_uuid: string, fid: number) => {
      try {
        const response = await generateFarcasterJWT({ signerUuid: signer_uuid, fid });
        console.log("generateToken", response);
        console.log("generateToken", response.message);
        if (response.message === "success") {
          //router.push("/dashboard");
          window.location.reload();
        } else {
          console.error("Failed to generate token:", response);
        }
      } catch (error) {
        console.error("Error generating token:", error);
        router.push("/not-found");
      }
    };

    if (!user) {
      setIsSignInModalOpen(true);
    } else if (isAuthenticated && user) {
      generateToken(user.signer_uuid, user.fid);
    }
  }, [user, isAuthenticated, generateFarcasterJWT, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <SignInModal isOpen={isSignInModalOpen} />;
}