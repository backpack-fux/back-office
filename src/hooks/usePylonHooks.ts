import { useCallback, useState } from 'react';
import { getPylonSDK, updatePylonToken } from '@/libs/pylon-client';
import { useAuth } from '@backpack-fux/pylon-sdk';

export function useAuthHooks() {
  const sdk = getPylonSDK();
  const { generateFarcasterJWT, deleteFarcasterJWT, isLoading, error } = useAuth(sdk);

  const generateFarcasterJWTWrapper = useCallback(async (data: Parameters<typeof generateFarcasterJWT>[0]) => {
    try {
      const response = await generateFarcasterJWT(data);
      
      if (response.message === 'success') {
        // The token is now handled by the SDK, so we don't need to manually update it
        // Just reload the page to apply the new authentication state
        window.location.reload();
      }
      
      return response;
    } catch (err) {
      // Error handling is already done in the useAuth hook
      throw err;
    }
  }, [generateFarcasterJWT]);

  const deleteFarcasterJWTWrapper = useCallback(async () => {
    try {
      const response = await deleteFarcasterJWT();
      
      if (response.message === 'success') {
        // The token is now handled by the SDK, so we don't need to manually update it
        // Just reload the page to apply the new authentication state
        window.location.reload();
      }
      
      return response;
    } catch (err) {
      // Error handling is already done in the useAuth hook
      throw err;
    }
  }, [deleteFarcasterJWT]);

  return { generateFarcasterJWT: generateFarcasterJWTWrapper, deleteFarcasterJWT: deleteFarcasterJWTWrapper, isLoading, error };
}