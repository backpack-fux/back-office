"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignInModal } from "@/components/siwn";
import { useNeynarContext } from "@neynar/react";
import Cookies from "js-cookie";

export default function SignInPage() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { user, isAuthenticated } = useNeynarContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setIsSignInModalOpen(true);
    } else if (isAuthenticated) {
      // This is NOT prod solution. We need to verify this server-side.
      Cookies.set("auth_token", user.signer_uuid, { expires: 7, secure: true });
      router.push("/dashboard");
    }
  }, [user, router, isAuthenticated]);

  const handleCloseSignInModal = () => {
    if (user) {
      setIsSignInModalOpen(false);
    }
  };

  return <SignInModal isOpen={isSignInModalOpen} onClose={handleCloseSignInModal} />;
}
