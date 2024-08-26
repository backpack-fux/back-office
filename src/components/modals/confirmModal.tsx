"use client";

import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Snippet } from "@nextui-org/snippet";
import { BridgeCurrency, SupportedBlockchain } from "@/types/bridge";
import Confetti from "react-confetti";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  combinedData: {
    amount: number;
    oboCustomer: string;
    transferFee: number;
    destinationAddress: string;
    network: SupportedBlockchain;
    currency: BridgeCurrency;
  };
  accountName: string;
  onConfirm: () => Promise<void>;
  isSubmitting: boolean;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  combinedData,
  accountName,
  onConfirm,
  isSubmitting,
}: ConfirmModalProps) {
  if (!combinedData) {
    return null;
  }

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  const handleConfirm = async () => {
    try {
      await onConfirm();
      setIsSuccess(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setIsSuccess(false);
    }
  };

  const { amount, oboCustomer, transferFee, destinationAddress, network, currency } = combinedData;

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <Modal isOpen={isOpen} scrollBehavior="inside" size="3xl" onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {isSuccess ? "Transfer Successful!" : "Confirm Transfer"}
          </ModalHeader>
          <ModalBody>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {isSuccess ? (
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 mb-4">🎉 Transfer Completed! 🎉</p>
                <p>Your transfer has been successfully processed.</p>
              </div>
            ) : (
              <Snippet
                codeString={`
                  From: ${accountName}
                  Amount: $${amount}
                  Transfer Fee: $${transferFee}
                  OBO Customer: ${oboCustomer}
                  To: ${destinationAddress}
                  Network: ${network}
                  Currency: ${currency}
                  Total: $${(amount + transferFee).toFixed(2)}
                `}
                color="default"
                symbol="Receipt"
                variant="bordered"
              >
                <div className="space-y-2">
                  <p><strong>From:</strong> {accountName}</p>
                  <p><strong>Amount:</strong> ${amount}</p>
                  <p><strong>Transfer Fee:</strong> ${transferFee}</p>
                  <p><strong>OBO Customer:</strong> {oboCustomer}</p>
                  <p><strong>To:</strong> {destinationAddress}</p>
                  <p><strong>Network:</strong> {network}</p>
                  <p><strong>Currency:</strong> {currency}</p>
                  <p><strong>Total:</strong> ${(amount + transferFee).toFixed(2)}</p>
                </div>
              </Snippet>
            )}
          </ModalBody>
          <ModalFooter>
            {!isSuccess && (
              <>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" isLoading={isSubmitting} onPress={handleConfirm}>
                  Confirm Transfer
                </Button>
              </>
            )}
            {isSuccess && (
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}