import { useNeynarContext } from "@neynar/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { PylonV2Service } from "@/services/PylonV2";

export const useSignOut = () => {
  const router = useRouter();
  const { logoutUser } = useNeynarContext();
  const pylonService = new PylonV2Service();

  const signOut = async () => {
    Cookies.remove("pyv2_auth_token");
    await pylonService.logout();
    logoutUser();
    router.push("/");
  };

  return signOut;
};
