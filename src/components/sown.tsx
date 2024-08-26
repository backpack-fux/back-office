"use client";

import { Button } from "@nextui-org/button";
import { useNeynarContext } from "@neynar/react";
import { useDeleteFarcasterJWT } from "@/hooks/auth/useDeleteFarcasterJWT";
import { useCallback, useState } from "react";

export const SignOutButton = () => {
  const { logoutUser } = useNeynarContext();
  const { deleteJWT, isLoading, error } = useDeleteFarcasterJWT();

  const handleSignOut = useCallback(async () => {
    try {
      await deleteJWT();
      logoutUser();
      // Uncomment the next line if you want to reload the page after logout
      // window.location.reload();
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  }, [deleteJWT, logoutUser]);

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