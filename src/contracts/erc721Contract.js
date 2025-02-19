import { ERC721_ABI } from "../constants/abi";
import { ethers } from "ethers";

export const erc721Contract = async (nft_address) => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = await new ethers.Contract(nft_address, ERC721_ABI, signer);
    return contract;
};