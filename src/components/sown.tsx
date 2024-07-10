"use client";

import { Button } from "@nextui-org/button";
import { useNeynarContext } from "@neynar/react";
import Cookies from "js-cookie";

export const SignOutButton = () => {
  const { logoutUser } = useNeynarContext();

  const handleSignOut = () => {
    logoutUser();
    Cookies.remove("pyv2_auth_token");
    window.location.reload();
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
