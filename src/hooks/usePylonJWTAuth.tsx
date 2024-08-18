import { PylonV2Service } from "@/services/PylonV2";
import { useNeynarContext } from "@neynar/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const pylonService = new PylonV2Service();

export function usePylonJWTAuth() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isTokenGenerated, setIsTokenGenerated] = useState(false);
  const { user, isAuthenticated } = useNeynarContext();
  const router = useRouter();

  useEffect(() => {
    const generateToken = async (signer_uuid: string, fid: number) => {
      if (isTokenGenerated) return;

      try {
        const response = await pylonService.generateAccessToken(signer_uuid, fid);

        if (response.message === "success") {
          setIsTokenGenerated(true);
          // Instead of reloading, you might want to update some global state or context
          // to indicate that the user is now fully authenticated
        } else {
          console.error("Failed to generate token:", response);
        }
      } catch (error) {
        console.error("Error generating token:", error);
        router.push("/not-found");
      }
    };

    if (user && isAuthenticated && !isTokenGenerated) {
      generateToken(user.signer_uuid, user.fid);
    }
  }, [user, router, isAuthenticated, isTokenGenerated]);

  return { isSignInModalOpen, setIsSignInModalOpen, isTokenGenerated };
}
