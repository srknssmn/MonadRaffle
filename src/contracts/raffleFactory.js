import { ethers } from "ethers";
import { RAFFLEFACTORY_ABI } from "../constants/abi";
import { RAFFLEFACTORY_ADDRESS } from "../constants/address";

export const useRaffleFactoryContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(RAFFLEFACTORY_ADDRESS, RAFFLEFACTORY_ABI, signer);
    return contract;
};