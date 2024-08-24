import { createPylonSDK, PylonSDK } from '@backpack-fux/pylon-sdk';

const BASE_URL = process.env.NEXT_PUBLIC_PYLON_API_URL || 'http://localhost:5000';

let pylonSDK: PylonSDK;

export function initializePylonSDK(token?: string) {
  pylonSDK = createPylonSDK(BASE_URL, token);
}

export function getPylonSDK(): PylonSDK {
  if (!pylonSDK) {
    initializePylonSDK();
  }
  return pylonSDK;
}

export function updatePylonToken(newToken: string) {
  initializePylonSDK(newToken);
}