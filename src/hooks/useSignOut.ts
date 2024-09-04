import { useNeynarContext } from "@neynar/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { PylonV2Service } from "@/services/PylonV2";
import { BACK_OFFICE_COOKIE_NAME } from "@/utils/constants";

export const useSignOut = () => {
  const router = useRouter();
  const { logoutUser } = useNeynarContext();
  const pylonService = new PylonV2Service();

  const signOut = async () => {
    Cookies.remove(BACK_OFFICE_COOKIE_NAME);
    await pylonService.logout();
    window.location.reload();
    logoutUser();
    // router.push("/");
  };

  return signOut;
};
