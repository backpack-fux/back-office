import { CreatePrefundedAccountTransferBody, CreatePrefundedAccountTransferResponse } from "@backpack-fux/pylon-sdk";
import { useState, useCallback } from "react";
import pylonInstance from "@/libs/pylon";

interface UseCreatePrefundedAccountTransferResult {
    createTransfer: (params: CreatePrefundedAccountTransferBody) => Promise<void>;
    transferResult: CreatePrefundedAccountTransferResponse | null;
    isLoading: boolean;
    error: Error | null;
  }

  export function useCreatePrefundedAccountTransfer(): UseCreatePrefundedAccountTransferResult {
    const [transferResult, setTransferResult] = useState<CreatePrefundedAccountTransferResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
  
    const createTransfer = useCallback(async (params: CreatePrefundedAccountTransferBody) => {
      setIsLoading(true);
      setError(null);
      setTransferResult(null);
  
      try {
        console.log("params", params);
        const result = await pylonInstance.createPrefundedAccountTransfer(params);
        console.log("result", result);
        setTransferResult(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    }, []);
  
    return { createTransfer, transferResult, isLoading, error };
  }