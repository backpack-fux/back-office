"use client"

import { subtitle, title } from "@/components/primitives";
import { SignInModal } from "@/components/siwn";
import { useNeynarContext } from "@neynar/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PartnerTabs = dynamic(() => import("@/components/tabs/partners"), {
  ssr: false,
});

const PrefundedTransferTabs = dynamic(() => import("@/components/tabs/bridge-transfer-prefunded"), {
  ssr: false,
});

export default function Home() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { user } = useNeynarContext();

  useEffect(() => {
    if (!user) {
      setIsSignInModalOpen(true);
    }
  }, [user]);

  const handleCloseSignInModal = () => {
    if (user) {
      setIsSignInModalOpen(false);
    }
  };
  
  return (
    <>
      <SignInModal isOpen={isSignInModalOpen} onClose={handleCloseSignInModal} />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Battle&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>Stations&nbsp;</h1>
          <br />
          <h2 className={subtitle({ class: "mt-4" })}>
            Heads down, keep building
          </h2>
        </div>
        <div className="w-full max-w-7xl mt-8 flex gap-4">
          <PartnerTabs />
        </div>
      </section>
    </>
  );
}
