import { isAddress } from "viem";

import { BridgePaymentRailEnum, SupportedBlockchain } from "@/types/bridge";

export function isValidEVMAddress(address: string): boolean {
  return isAddress(address);
}

export function getNetworkName(network: SupportedBlockchain): string {
  return network.charAt(0).toUpperCase() + network.slice(1);
}

export function getValidNetworksForAddress(address: string): SupportedBlockchain[] {
  if (address.startsWith("0x") && address.length === 42) {
    // EVM-compatible address
    return [
      BridgePaymentRailEnum.POLYGON,
      BridgePaymentRailEnum.ARBITRUM,
      BridgePaymentRailEnum.AVALANCHE,
      BridgePaymentRailEnum.OPTIMISM,
    ];
  } else if (address.length === 44 || address.length === 32) {
    // Solana address (base58-encoded public key)
    return [BridgePaymentRailEnum.SOLANA];
  } else if (address.startsWith("G") && address.length === 56) {
    // Stellar address
    return [BridgePaymentRailEnum.STELLAR];
  }
  // Add more conditions for other blockchain address formats if needed

  return []; // Return empty array if no valid networks found
}

export function formatAmount(value: string): string {
  const numericValue = value.replace(/[^0-9.]/g, "");
  const parts = numericValue.split(".");

  return parts[0] + (parts.length > 1 ? "." + parts[1].slice(0, 2) : "");
}

export function validateAmount(value: string, allowZero: boolean = false): string {
  if (value === "") return "";
  const numValue = parseFloat(value);

  if (isNaN(numValue)) return "Invalid amount";
  if (!allowZero && numValue < 20) return "Amount must be at least $20";
  if (allowZero && numValue < 0) return "Amount must be non-negative";

  return "";
}