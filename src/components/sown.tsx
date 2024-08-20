"use client";

import { Button } from "@nextui-org/button";
import { useSignOut } from "@/hooks/useSignOut";

export const SignOutButton = () => {
  const signOut = useSignOut();

  return (
    <Button
      className="bg-danger text-sm font-normal text-danger-foreground"
      variant="flat"
      onClick={signOut}
    >
      Sign Out
    </Button>
  );
};
