export class PylonV2Service {
  protected apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  protected methods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
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

    return await response.json();
  }
}
