
import { ethers } from 'ethers';

export function isValidEVMAddress(address: string): boolean {
  return ethers.isAddress(address);
}
export type DestinationAccount = {
  address: string;
  network: SupportedBlockchain;
};

export const destinationAccountPlaceholder = "0x...";

export type SupportedBlockchain = 
  | BridgePaymentRailEnum.POLYGON
  | BridgePaymentRailEnum.ARBITRUM
  | BridgePaymentRailEnum.AVALANCHE
  | BridgePaymentRailEnum.OPTIMISM
  | BridgePaymentRailEnum.SOLANA
  | BridgePaymentRailEnum.STELLAR;

export function getNetworkName(network: SupportedBlockchain): string {
  return network.charAt(0).toUpperCase() + network.slice(1);
}

export enum BridgePaymentRailEnum {
  POLYGON = 'polygon',
  ARBITRUM = 'arbitrum',
  AVALANCHE = 'avalanche',
  OPTIMISM = 'optimism',
  SOLANA = 'solana',
  STELLAR = 'stellar',
  ACH = 'ach',
  WIRE = 'wire',
  ACH_PUSH = 'ach_push',
  PREFUNDED = 'prefunded',
}

export enum BridgeCurrencyEnum {
  USD = 'usd',
  USDC = 'usdc',
  USDT = 'usdt',
  DAI = 'dai',
}

export const prefundedCurrencyOptions = [
  { key: BridgeCurrencyEnum.USD, label: "USD" },
  { key: BridgeCurrencyEnum.USDC, label: "USDC" },
  { key: BridgeCurrencyEnum.USDT, label: "USDT" },
  { key: BridgeCurrencyEnum.DAI, label: "DAI" },
];

export const prefundedNetworkOptions = [
  { key: BridgePaymentRailEnum.ACH, label: "ACH" },
  { key: BridgePaymentRailEnum.WIRE, label: "Wire" },
  { key: BridgePaymentRailEnum.ACH_PUSH, label: "ACH Push" },
  { key: BridgePaymentRailEnum.PREFUNDED, label: "Prefunded" },
  { key: BridgePaymentRailEnum.POLYGON, label: "Polygon" },
  { key: BridgePaymentRailEnum.ARBITRUM, label: "Arbitrum" },
  { key: BridgePaymentRailEnum.AVALANCHE, label: "Avalanche" },
  { key: BridgePaymentRailEnum.OPTIMISM, label: "Optimism" },
  { key: BridgePaymentRailEnum.SOLANA, label: "Solana" },
  { key: BridgePaymentRailEnum.STELLAR, label: "Stellar" },
];

export const oboCustomers = [
  { 
    key: "backpack-dao-llc", 
    label: "Backpack DAO LLC",
    value: process.env.NEXT_PUBLIC_BACKPACK_DAO_LLC_ID || "default_backpack_id",
    type: BridgePaymentRailEnum.PREFUNDED
  },
  { 
    key: "coinfella", 
    label: "Coinfella (Bucket Labs Ltd)",
    value: process.env.NEXT_PUBLIC_COINFELLA_ID || "default_coinfella_id",
    type: BridgePaymentRailEnum.PREFUNDED
  },
];
