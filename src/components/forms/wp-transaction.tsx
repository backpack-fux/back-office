import { useProcessTransaction } from "@/hooks/useWPProcessTransaction";
import { TransactionProcessInput, TransactionProcessSchema } from "@/schemas/pylonWP";
import React, { useState } from "react";

export function TransactionForm() {
  const { processTransaction, isLoading, error, result } = useProcessTransaction();
  const [formData, setFormData] = useState<TransactionProcessInput>({
    paymentProcessor: "WORLDPAY",
    sessionUrl: "",
    order: {
      merchant: { id: 1 },
      buyer: {
        billingAddress: {
          firstName: "",
          lastName: "",
          address1: "",
          postalCode: "",
          city: "",
          countryCode: "GB",
        },
        isShippingEqualBilling: true,
      },
      value: {
        currency: "GBP",
        amount: 0,
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = TransactionProcessSchema.parse(formData);
      await processTransaction(validatedData);
    } catch (err) {
      console.error("Validation error:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add form inputs here */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Processing..." : "Process Transaction"}
      </button>
      {error && <p>Error: {error}</p>}
      {result && <p>Transaction processed successfully!</p>}
    </form>
  );
}
