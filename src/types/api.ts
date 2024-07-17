export type GenerateJWTResponse = {
  message: string;
};

export type BridgePrefundedAccountResponse = {
  id: string;
  available_balance: string;
  currency: string;
  name: string;
};
