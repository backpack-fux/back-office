import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Snippet } from "@nextui-org/snippet";
import { BridgeCurrency, SupportedBlockchain } from "@/types/bridge";

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
  onConfirm: () => void;
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
  return (
    <Modal isOpen={isOpen} scrollBehavior="inside" size="3xl" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Confirm Transfer</ModalHeader>
        <ModalBody>
          <Snippet
            codeString={`
              From: ${accountName}
              Amount: $${combinedData.amount}
              Transfer Fee: $${combinedData.transferFee}
              OBO Customer: ${combinedData.oboCustomer}
              To: ${combinedData.destinationAddress}
              Network: ${combinedData.network}
              Currency: ${combinedData.currency}
              Total: $${(combinedData.amount + combinedData.transferFee).toFixed(2)}
            `}
            color="default"
            symbol="Receipt"
            variant="bordered"
          >
            <div className="space-y-2">
              <p>
                <strong>From:</strong> {accountName}
              </p>
              <p>
                <strong>Amount:</strong> ${combinedData.amount}
              </p>
              <p>
                <strong>Transfer Fee:</strong> ${combinedData.transferFee}
              </p>
              <p>
                <strong>OBO Customer:</strong> {combinedData.oboCustomer}
              </p>
              <p>
                <strong>To:</strong> {combinedData.destinationAddress}
              </p>
              <p>
                <strong>Network:</strong> {combinedData.network}
              </p>
              <p>
                <strong>Currency:</strong> {combinedData.currency}
              </p>
              <p>
                <strong>Total:</strong> $
                {(combinedData.amount + combinedData.transferFee).toFixed(2)}
              </p>
            </div>
          </Snippet>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" isLoading={isSubmitting} onPress={onConfirm}>
            Confirm Transfer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
