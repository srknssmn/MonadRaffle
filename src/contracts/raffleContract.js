import { ethers } from "ethers";
import { RAFFLE_ABI } from "../constants/abi";

export const useRaffleContract = (raffle_address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(raffle_address, RAFFLE_ABI, signer);
    return contract;
};