import { RequestInit } from "next/dist/server/web/spec-extension/request";

import { BridgeCurrencyEnum, SourceAccount, SupportedBlockchain } from "@/types/bridge";
import {
  BridgePrefundedAccountResponse,
  BridgePrefundedAccountTransferResponse,
  GenerateJWTResponse,
} from "@/types/pylon";

type RequestOptions = Omit<RequestInit, "body"> & { body?: string | object };

export class PylonV2Service {
  private apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  private methods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  } as const;

  private headers = (isBody: boolean) => {
    return {
      Accept: "application/json",
      ...(isBody ? { "Content-Type": "application/json" } : {}),
    };
  };

  private async request<T>(url: string, options: RequestOptions): Promise<T> {
    const response = await fetch(url, {
      ...options,
      body: typeof options.body === "object" ? JSON.stringify(options.body) : options.body,
    });

    if (!response.ok) {
      const errorInfo = `URL: ${url} - Status: ${response.status} (${response.statusText})`;

      console.error(`Request failed: ${errorInfo}`);

      const responseBody = await response.text();

      console.error(`Response Body: ${responseBody.substring(0, 200)}...`);

      throw new Error(
        `Request failed with status ${response.status} (${response.statusText}) at ${url}`
      );
    }

    return (await response.json()).data;
  }

  public async generateAccessToken(signerUuid: string, fid: number): Promise<GenerateJWTResponse> {
    return await this.request(`${this.apiBaseUrl}/v1/auth/jwt`, {
      method: this.methods.POST,
      headers: this.headers(true),
      body: JSON.stringify({ signerUuid, fid }),
      credentials: "include",
    });
  }

  public async getPrefundedAccount(): Promise<BridgePrefundedAccountResponse[]> {
    return await this.request(`${this.apiBaseUrl}/v1/bridge/prefunded-account-balance`, {
      method: this.methods.POST,
      headers: this.headers(false),
      credentials: "include",
    });
  }

  public async createPrefundedAccountTransfer(transferData: {
    amount: number;
    on_behalf_of: string;
    developer_fee?: number;
    source: SourceAccount & {
      currency: BridgeCurrencyEnum;
      prefunded_account_id: string;
    };
    destination: {
      payment_rail: SupportedBlockchain;
      currency: BridgeCurrencyEnum;
      to_address: string;
    };
  }): Promise<BridgePrefundedAccountTransferResponse> {
    return await this.request(`${this.apiBaseUrl}/v1/bridge/prefunded-account-transfer`, {
      method: this.methods.POST,
      headers: {
        ...this.headers(true),
      },
      body: JSON.stringify(transferData),
      credentials: "include",
    });
  }
}
