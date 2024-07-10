"use client";

import { Button } from "@nextui-org/button";
import { useNeynarContext } from "@neynar/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const { logoutUser } = useNeynarContext();
  const router = useRouter();

  const handleSignOut = () => {
    Cookies.remove("pyv2_auth_token");
    logoutUser();
    router.push("/");
  };

  return (
    <Button
      className="bg-danger text-sm font-normal text-danger-foreground"
      onClick={handleSignOut}
      variant="flat"
    >
      Sign Out
    </Button>
  );
};
