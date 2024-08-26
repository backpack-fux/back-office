import { useState } from "react";
import {
  BridgeCurrency,
  BridgePaymentRail,
  CreatePrefundedAccountTransferBody,
} from "@backpack-fux/pylon-sdk";

import pylon from "@/libs/pylon";
import { SupportedBlockchain } from "@/types/bridge";

export function usePrefundedTransfer(accountId: string) {
  const [selectedTab, setSelectedTab] = useState("account");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [combinedData, setCombinedData] = useState<{
    amount: number;
    oboCustomer: string;
    transferFee: number;
    destinationAddress: string;
    network: SupportedBlockchain;
    currency: BridgeCurrency;
  }>({
    amount: 0,
    oboCustomer: "",
    transferFee: 0,
    destinationAddress: "",
    network: "polygon" as SupportedBlockchain,
    currency: "usd" as BridgeCurrency,
  });

  const handleSetValues = (values: {
    amount: number;
    oboCustomer: string;
    transferFee: number;
  }) => {
    setCombinedData((prev) => ({ ...prev, ...values }));
    setSelectedTab("destination");
  };

  const handleSubmit = (values: {
    destinationAddress: string;
    network: SupportedBlockchain;
    currency: BridgeCurrency;
  }) => {
    setCombinedData((prev) => ({ ...prev, ...values }));
    setIsConfirmModalOpen(true);
  };

  const handleConfirmTransfer = async () => {
    setIsSubmitting(true);
    try {
      const transferData: CreatePrefundedAccountTransferBody = {
        amount: Math.round(combinedData.amount),
        on_behalf_of: combinedData.oboCustomer,
        developer_fee: Math.round(combinedData.transferFee),
        source: {
          payment_rail: "prefunded" as BridgePaymentRail,
          currency: "usd" as BridgeCurrency,
          prefunded_account_id: accountId,
        },
        destination: {
          payment_rail: combinedData.network as BridgePaymentRail,
          currency: combinedData.currency as BridgeCurrency,
          to_address: combinedData.destinationAddress,
        },
      };

      console.log("usePrefundedTransfer transferData", transferData);
      const response = await pylon.createPrefundedAccountTransfer(transferData);

      console.log("Transfer submitted successfully:", response);
      setIsConfirmModalOpen(false);
      // Reset form or show success message
    } catch (error) {
      console.error("Error submitting transfer:", error);
      // Show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    combinedData,
    handleSetValues,
    handleSubmit,
    handleConfirmTransfer,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    isSubmitting,
    selectedTab,
    setSelectedTab,
  };
}
