"use client";

import { PylonV2Service } from "@/services/PylonV2";
import { useEffect, useState } from "react";

const pylonService = new PylonV2Service();

export function BridgeBalance() {
  const [balance, setBalance] = useState("$0.00");
  console.log("Balance", balance);

  useEffect(() => {
    const fetchBridgeBalance = async () => {
      try {
        const response = await pylonService.getPrefundedAccountBalance();
        console.log("response", response);
        setBalance(`$${response.available_balance}`);
      } catch (error) {
        console.error("Error fetching Bridge balance:", error);
      }
    };

    fetchBridgeBalance();
  }, []);

  return <>{balance}</>;
}
