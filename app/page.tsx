"use client"

import { subtitle, title } from "@/components/primitives";
import dynamic from "next/dynamic";

const PartnerTabs = dynamic(() => import("@/components/tabs/partners"), {
  ssr: false,
});

const PrefundedTransferTabs = dynamic(() => import("@/components/tabs/bridge-transfer-prefunded"), {
  ssr: false,
});

export default function Home() {
  return (
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
  );
}
