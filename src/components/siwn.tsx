import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { NeynarAuthButton, useNeynarContext } from "@neynar/react";
import { useEffect, useState } from "react";

interface SignInModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useNeynarContext();
  useEffect(() => {
    if (user) {
      onClose?.();
    }
  }, [user, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} // Empty function to prevent default close behavior
      hideCloseButton
      isDismissable={false} // Prevents closing on outside click
      isKeyboardDismissDisabled={true} // Prevents closing on Esc key
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
