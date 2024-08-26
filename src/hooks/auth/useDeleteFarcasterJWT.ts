// src/hooks/useDeleteFarcasterJWT.ts

import { useState, useCallback } from 'react';
import pylonInstance from '@/libs/pylon';

interface UseDeleteFarcasterJWTResult {
  deleteJWT: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  message: string | null;
}

export function useDeleteFarcasterJWT(): UseDeleteFarcasterJWTResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const deleteJWT = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await pylonInstance.deleteFarcasterJWT();
      console.log("response in deleteJWT hook", response);
      setMessage(response.message);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { deleteJWT, isLoading, error, message };
}