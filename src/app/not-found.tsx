"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useNeynarContext } from "@neynar/react";
import Cookies from "js-cookie";

export default function ForbiddenPage() {
  const router = useRouter();
  const { logoutUser } = useNeynarContext();

  const handleRetrySignIn = () => {
    Cookies.remove("pyv2_auth_token");
    logoutUser();
    router.push("/");
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Access Forbidden</h1>
      <p className="mb-6">
        You do not have permission to access this page. Please sign in to continue.
      </p>
      <Button color="primary" onPress={handleRetrySignIn}>
        Retry Sign In
      </Button>
    </div>
  );
}
