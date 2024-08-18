import { TransactionProcessInput } from "@/schemas/pylonWP";
import { useState } from "react";

interface UseProcessTransactionResult {
  processTransaction: (data: TransactionProcessInput) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  result: any | null;
}

export function useProcessTransaction(): UseProcessTransactionResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const processTransaction = async (data: TransactionProcessInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/transaction/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred while processing the transaction");
      }

      const resultData = await response.json();
      setResult(resultData.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { processTransaction, isLoading, error, result };
}
