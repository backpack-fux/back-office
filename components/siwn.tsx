import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useState } from 'react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement the Sign In With Neynar logic here
      // This will involve calling the Neynar API endpoints
      
      // If authentication is successful, call onClose()
      onClose();
    } catch (error) {
      // Handle authentication error
      console.error("Authentication failed:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

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
          <Button 
            onClick={handleSignIn} 
            color="primary" 
            size="lg"
            isLoading={isLoading}
          >
            Sign In With Neynar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}