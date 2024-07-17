import { ethers } from "ethers";
import { SupportedBlockchain } from "../data/bridge";


export function isValidEVMAddress(address: string): boolean {
    return ethers.isAddress(address);
  }
  
  export function getNetworkName(network: SupportedBlockchain): string {
    return network.charAt(0).toUpperCase() + network.slice(1);
  }