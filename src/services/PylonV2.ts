import { RequestInit } from "next/dist/server/web/spec-extension/request";

import { BridgePrefundedAccountBalanceResponse, GenerateJWTResponse } from "@/types/api";

type RequestOptions = Omit<RequestInit, "body"> & { body?: string | object };

export class PylonV2Service {
  private apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  private methods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  } as const;

  private headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  private async request<T>(url: string, options: RequestOptions): Promise<T> {
    console.log("url", url);
    console.log("options", options);
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

    const data = await response.json();

    return data.data;
  }

  public async generateAccessToken(signerUuid: string, fid: number): Promise<GenerateJWTResponse> {
    return await this.request(`${this.apiBaseUrl}/v1/auth/jwt`, {
      method: this.methods.POST,
      headers: this.headers,
      body: JSON.stringify({ signerUuid, fid }),
    });
  }

  public async getPrefundedAccountBalance(): Promise<BridgePrefundedAccountBalanceResponse> {
    console.log("getPrefundedAccountBalance");
    return await this.request(`${this.apiBaseUrl}/v1/bridge/prefunded-account-balance`, {
      method: this.methods.GET,
      headers: this.headers,
    });
  }
}
