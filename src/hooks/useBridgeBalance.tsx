"use client";

import { useEffect, useState } from "react";

import { PylonV2Service } from "@/services/PylonV2";
import { BridgeCurrency, BridgeCurrencyEnum } from "@/types/bridge";

const pylonService = new PylonV2Service();

export function useBridgeAccount() {
  const [balance, setBalance] = useState<number>(0);
  const [currency, setCurrency] = useState<BridgeCurrency>(BridgeCurrencyEnum.USD);
  const [accountName, setAccountName] = useState<string>("");
  const [accountId, setAccountId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBridgeAccount = async () => {
      try {
        const [response] = await pylonService.getPrefundedAccount();

        setBalance(Number(response.available_balance));
        setCurrency(response.currency as BridgeCurrency);
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
