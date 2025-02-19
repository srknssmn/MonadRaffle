import { HUNTERS_BADGE_ABI } from "../constants/abi";
import { HUNTERS_NFT_COLLECTION } from "../constants/address";
import { ethers } from "ethers";

export const huntersBadge = async () => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = await new ethers.Contract(HUNTERS_NFT_COLLECTION, HUNTERS_BADGE_ABI, signer);
    return contract;
};