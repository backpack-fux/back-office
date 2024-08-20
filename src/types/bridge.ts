// Enums
export enum BridgePaymentRailEnum {
  POLYGON = "polygon",
  ARBITRUM = "arbitrum",
  AVALANCHE = "avalanche",
  OPTIMISM = "optimism",
  SOLANA = "solana",
  STELLAR = "stellar",
  ACH = "ach",
  WIRE = "wire",
  ACH_PUSH = "ach_push",
  PREFUNDED = "prefunded",
}

export enum BridgeCurrencyEnum {
  USD = "usd",
  USDC = "usdc",
  USDT = "usdt",
  DAI = "dai",
}

// Types
export type SupportedBlockchain = Extract<
  BridgePaymentRailEnum,
  | BridgePaymentRailEnum.POLYGON
  | BridgePaymentRailEnum.ARBITRUM
  | BridgePaymentRailEnum.AVALANCHE
  | BridgePaymentRailEnum.OPTIMISM
  | BridgePaymentRailEnum.SOLANA
  | BridgePaymentRailEnum.STELLAR
>;

export type BridgeCurrency = BridgeCurrencyEnum;

export type DestinationAccount = {
  address: string;
  network: SupportedBlockchain;
};

export type SourceAccount = {
  payment_rail: BridgePaymentRailEnum;
  currency: BridgeCurrencyEnum;
};

// Constants
export const destinationAccountPlaceholder = "0xDeadBeef";

// Options
export const prefundedCurrencyOptions: Array<{
  key: BridgeCurrencyEnum;
  label: BridgeCurrencyEnum;
}> = [
  { key: BridgeCurrencyEnum.USDC, label: BridgeCurrencyEnum.USDC },
  { key: BridgeCurrencyEnum.USDT, label: BridgeCurrencyEnum.USDT },
  { key: BridgeCurrencyEnum.DAI, label: BridgeCurrencyEnum.DAI },
];

export const prefundedNetworkOptions: Array<{
  key: BridgePaymentRailEnum;
  label: BridgePaymentRailEnum;
}> = [
  {
    key: BridgePaymentRailEnum.POLYGON,
    label: BridgePaymentRailEnum.POLYGON,
  },
  {
    key: BridgePaymentRailEnum.ARBITRUM,
    label: BridgePaymentRailEnum.ARBITRUM,
  },
  {
    key: BridgePaymentRailEnum.AVALANCHE,
    label: BridgePaymentRailEnum.AVALANCHE,
  },
  {
    key: BridgePaymentRailEnum.OPTIMISM,
    label: BridgePaymentRailEnum.OPTIMISM,
  },
  {
    key: BridgePaymentRailEnum.SOLANA,
    label: BridgePaymentRailEnum.SOLANA,
  },
  {
    key: BridgePaymentRailEnum.STELLAR,
    label: BridgePaymentRailEnum.STELLAR,
  },
];

export const oboCustomers = [
  {
    key: "backpack-dao-llc",
    label: "Backpack DAO LLC",
    value: process.env.NEXT_PUBLIC_BACKPACK_DAO_LLC_ID || "default_backpack_id",
    type: BridgePaymentRailEnum.PREFUNDED,
  },
  {
    key: "coinfella",
    label: "Coinfella (Bucket Labs Ltd)",
    value: process.env.NEXT_PUBLIC_COINFELLA_ID || "default_coinfella_id",
    type: BridgePaymentRailEnum.PREFUNDED,
  },
] as const;

export type OboCustomer = (typeof oboCustomers)[number];
