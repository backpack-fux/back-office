import { useState, useCallback } from "react";

import pylonInstance from "@/libs/pylon";

interface UseGenerateFarcasterJWTResult {
  generateJWT: (signerUuid: string) => Promise<void>;
  message: string | null;
  isLoading: boolean;
  error: Error | null;
}

export function useGenerateFarcasterJWT(fid: number): UseGenerateFarcasterJWTResult {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateJWT = useCallback(
    async (signerUuid: string) => {
      setIsLoading(true);
      setError(null);
      setMessage(null);

      try {
        const response = await pylonInstance.generateFarcasterJWT({ fid, signerUuid });

        setMessage(response.message);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
      } finally {
        setIsLoading(false);
      }
    },
    [fid]
  );

  return { generateJWT, message, isLoading, error };
}
