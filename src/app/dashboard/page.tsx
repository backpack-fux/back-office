"use client";

import { useNeynarContext } from "@neynar/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { subtitle, title } from "@/components/primitives";
import { SignInModal } from "@/components/siwn";

const PartnerTabs = dynamic(() => import("@/components/tabs/partnerTabs"), {
  ssr: false,
});

export default function Dashboard() {
  console.log("Dashboard rendering");
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useNeynarContext();
  const router = useRouter();

  console.log("Dashboard rendering. User:", user, "isAuthenticated:", isAuthenticated);

  useEffect(() => {
    console.log("useEffect running. isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) {
      console.log("Not authenticated, attempting to redirect to /auth");
      //router.push("/auth");
    } else {
      console.log("Authenticated, setting isLoading to false");
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    console.log("Rendering loading state");

    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("No user, rendering SignInModal");

    return <SignInModal isOpen={true} />;
  }

  console.log("Rendering dashboard content");

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg justify-center text-center">
        <h1 className={title({ color: "charyo" })}>Battle Stations&nbsp;</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4", color: "charyo" })}>Heads down, keep building</h2>
      </div>
      <div className="mt-8 flex w-full max-w-7xl gap-4">
        <PartnerTabs />
      </div>
    </section>
  );
}
