"use client";

import { useSignOut } from "@/hooks/useSignOut";
import { Button } from "@nextui-org/button";

export default function ForbiddenPage() {
  const signOut = useSignOut();

  return (
    <div className="text-center">
      <h1 className="mb-4 text-2xl font-bold">Access Forbidden</h1>
      <p className="mb-6">
        You do not have permission to access this page. Please sign in to continue.
      </p>
      <Button color="primary" onPress={signOut}>
        Retry Sign In
      </Button>
    </div>
  );
}
