"use client";

import { useNeynarContext } from "@neynar/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SignInModal } from "@/components/siwn";
import { PylonV2Service } from "@/services/PylonV2";

const pylonService = new PylonV2Service();

export default function SignInPage() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { user, isAuthenticated } = useNeynarContext();
  const router = useRouter();

  /**
   * 1. Get user to sign in
   * 2. Check if user is allowed to generate JWT
   * 3. If allowed, generate JWT
   * 4. If not allowed, show error message
   */
  useEffect(() => {
    const generateToken = async (signer_uuid: string, fid: number) => {
      try {
        const response = await pylonService.generateAccessToken(signer_uuid, fid);

        if (response.message) {
          Cookies.set("pyv2_auth_token", response.message, {
            expires: 1,
            secure: true,
          });
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
    } else if (isAuthenticated) {
      if (user) {
        generateToken(user.signer_uuid, user.fid);
      } else {
        console.error("User does not have a valid FID");
      }
    }
  }, [user, router, isAuthenticated]);

  return <SignInModal isOpen={isSignInModalOpen} />;
}
