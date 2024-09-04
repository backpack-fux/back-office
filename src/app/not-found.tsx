"use client";

import { Button } from "@nextui-org/button";
import { useNeynarContext } from "@neynar/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();
  const { logoutUser } = useNeynarContext();

  const handleRetrySignIn = () => {
    Cookies.remove("pyv2_back_office_token");
    logoutUser();
    router.push("/");
  };

  return (
    <div className="text-center">
      <h1 className="mb-4 text-2xl font-bold">Access Forbidden</h1>
      <p className="mb-6">
        You do not have permission to access this page. Please sign in to continue.
      </p>
      <Button color="primary" onPress={handleRetrySignIn}>
        Retry Sign In
      </Button>
    </div>
  );
}
