"use client";

import { useNeynarContext } from "@neynar/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SignInModal } from "@/components/siwn";
import { PylonV2Service } from "@/services/PylonV2";

const pylonService = new PylonV2Service();

export default function SignInPage() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { user, isAuthenticated } = useNeynarContext();
  const router = useRouter();

  useEffect(() => {
    const generateToken = async (signer_uuid: string, fid: number) => {
      try {
        const response = await pylonService.generateAccessToken(signer_uuid, fid);

        if (response.message === "success") {
          window.location.reload();
        } else {
          console.error("Failed to generate token:", response);
        }
      } catch (error) {
        console.error("Error generating token:", error);
        router.push("/not-found");
      }
    };

    const timer = setTimeout(() => {
      if (!user) {
        setIsSignInModalOpen(true);
      } else if (isAuthenticated) {
        if (user) {
          generateToken(user.signer_uuid, user.fid);
        } else {
          console.error("User does not have a valid FID");
        }
      }
    }, 0 * 1000);

    return () => clearTimeout(timer);
  }, [user, router, isAuthenticated]);

  return <SignInModal isOpen={isSignInModalOpen} />;
}
