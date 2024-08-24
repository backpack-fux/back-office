"use client";

import { Button } from "@nextui-org/button";
import { useNeynarContext } from "@neynar/react";
import { useAuthHooks } from "@/hooks/usePylonHooks";
import { useState } from "react";

export const SignOutButton = () => {
  const { logoutUser } = useNeynarContext();
  const { deleteFarcasterJWT } = useAuthHooks();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await deleteFarcasterJWT();
      logoutUser();
      window.location.reload();
    } catch (error) {
      console.error("Error during sign out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="bg-danger text-sm font-normal text-danger-foreground"
      variant="flat"
      onClick={handleSignOut}
      isLoading={isLoading}
    >
      Sign Out
    </Button>
  );
};