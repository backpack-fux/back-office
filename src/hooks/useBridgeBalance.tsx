"use client";

import { PylonV2Service } from "@/services/PylonV2";
import { useEffect, useState } from "react";

const pylonService = new PylonV2Service();

export function useBridgeAccount() {
  const [balance, setBalance] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("usd");
  const [accountName, setAccountName] = useState<string>("");
  const [accountId, setAccountId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBridgeAccount = async () => {
      try {
        const [response] = await pylonService.getPrefundedAccount();
        setBalance(Number(response.available_balance));
        setCurrency(response.currency);
        setAccountName(response.name);
        setAccountId(response.id);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Bridge account:", error);
      }
    };

    fetchBridgeAccount();
  }, []);

  return { balance, currency, accountName, accountId, isLoading };
}
