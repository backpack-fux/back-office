import { GenerateJWTResponse } from "@/types/api";
import { NextResponse } from "next/server";

export class PylonV2Service {
  private apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  private methods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  };

  private headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  private async request(url: string, options: RequestInit): Promise<any> {
    const response = await fetch(url, options);

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

  public async generateJWT(signerUuid: string, fid: number): Promise<GenerateJWTResponse> {
    return await this.request(`${this.apiBaseUrl}/v1/auth/jwt`, {
      method: this.methods.POST,
      headers: this.headers,
      body: JSON.stringify({ signerUuid, fid }),
    });
  }
}
