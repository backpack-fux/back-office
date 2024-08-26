"use client";

import { useNeynarContext } from "@neynar/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SignInModal } from "@/components/siwn";
import { useGenerateFarcasterJWT } from "@/hooks/auth/useGenerateFarcasterJWT";

export default function SignInPage() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { user, isAuthenticated } = useNeynarContext();
  const router = useRouter();

  // We'll initialize the hook with a default FID of 0, and update it when we have the user's FID
  const { generateJWT, message, isLoading, error } = useGenerateFarcasterJWT(user?.fid || 0);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (!user) {
        setIsSignInModalOpen(true);
      } else if (isAuthenticated && user) {
        try {
          await generateJWT(user.signer_uuid);
          if (message === "success") {
            // router.push("/dashboard");
            window.location.reload();
          } else {
            console.error("Failed to generate token:", message);
          }
        } catch (error) {
          console.error("Error generating token:", error);
          router.push("/not-found");
        }
      }
    };

    handleAuthentication();
  }, [user, isAuthenticated, generateJWT, message, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <SignInModal isOpen={isSignInModalOpen} />;
}
