"use client";

import { NeynarAuthButton } from "@neynar/react";

export function SignIn() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <NeynarAuthButton />
      </div>
    </main>
  );
}
