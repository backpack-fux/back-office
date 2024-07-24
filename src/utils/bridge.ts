import { ethers } from "ethers";
import { BridgePaymentRailEnum, SupportedBlockchain } from "../types/bridge";

export function isValidEVMAddress(address: string): boolean {
  return ethers.isAddress(address);
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
      BridgePaymentRailEnum.OPTIMISM
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