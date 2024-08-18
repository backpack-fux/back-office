"use client";

import { SignInModal } from "@/components/siwn";
import { usePylonJWTAuth } from "@/hooks/usePylonJWTAuth";

export default function SignInPage() {
  const { isSignInModalOpen } = usePylonJWTAuth();

  return <SignInModal isOpen={isSignInModalOpen} />;
}
