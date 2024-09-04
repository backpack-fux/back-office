"use client";

import { Button } from "@nextui-org/button";
import { useNeynarContext } from "@neynar/react";
import Cookies from "js-cookie";

export const SignOutButton = () => {
  const { logoutUser } = useNeynarContext();

  const handleSignOut = () => {
    logoutUser();
    Cookies.remove("pyv2_back_office_token"); // TODO: we need to create an API route to delete the auth token
    window.location.reload();
  };

  return (
    <Button
      className="bg-danger text-sm font-normal text-danger-foreground"
      variant="flat"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};
