"use client";

import { PylonV2Service } from "@/services/PylonV2";
import { useEffect, useState } from "react";

const pylonService = new PylonV2Service();

export function useBridgeBalance() {
  const [balance, setBalance] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("usd");
  const [accountName, setAccountName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBridgeBalance = async () => {
      try {
        const [response] = await pylonService.getPrefundedAccountBalance();
        setBalance(Number(response.available_balance));
        setCurrency(response.currency);
        setAccountName(response.name);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Bridge balance:", error);
      }
    };

    fetchBridgeBalance();
  }, []);

  return { balance, currency, accountName, isLoading };
}
