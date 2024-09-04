import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { NeynarAuthButton, useNeynarContext } from "@neynar/react";
import { useEffect } from "react";

interface SignInModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { user } = useNeynarContext();

  useEffect(() => {
    if (user) {
      onClose?.();
    }
  }, [user, onClose]);

  return (
    <Modal
      hideCloseButton
      isDismissable={false} // Prevents closing on outside click
      isKeyboardDismissDisabled={true} // Prevents closing on Esc key
      isOpen={isOpen}
      onClose={() => {}} // Empty function to prevent default close behavior
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Welcome to Battle Stations</ModalHeader>
        <ModalBody>
          <p>Please sign in to continue. You must authenticate to access the application.</p>
        </ModalBody>
        <ModalFooter>
          <NeynarAuthButton />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
