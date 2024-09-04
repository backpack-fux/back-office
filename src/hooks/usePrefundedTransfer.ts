import { useState } from "react";

import { PylonV2Service } from "@/services/PylonV2";
import { BridgeCurrencyEnum, BridgePaymentRailEnum, SupportedBlockchain } from "@/types/bridge";

const pylonService = new PylonV2Service();

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
    currency: BridgeCurrencyEnum;
  }>({
    amount: 0,
    oboCustomer: "",
    transferFee: 0,
    destinationAddress: "",
    network: BridgePaymentRailEnum.POLYGON,
    currency: BridgeCurrencyEnum.USD,
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
    currency: BridgeCurrencyEnum;
  }) => {
    setCombinedData((prev) => ({ ...prev, ...values }));
    setIsConfirmModalOpen(true);
  };

  const handleConfirmTransfer = async () => {
    setIsSubmitting(true);
    try {
      const transferData = {
        amount: combinedData.amount,
        on_behalf_of: combinedData.oboCustomer,
        developer_fee: combinedData.transferFee,
        source: {
          payment_rail: BridgePaymentRailEnum.PREFUNDED,
          currency: BridgeCurrencyEnum.USD,
          prefunded_account_id: accountId,
        },
        destination: {
          payment_rail: combinedData.network,
          currency: combinedData.currency,
          to_address: combinedData.destinationAddress,
        },
      };

      const response = await pylonService.createPrefundedAccountTransfer(transferData);

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
