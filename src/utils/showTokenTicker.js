import {ethers} from "ethers";
import { verifyNetwork } from "../controllers/verifyNetwork";
import { ERC721_ABI } from "../constants/abi";

const showTokenTicker = () => {

    const showToken = async(address) => {
        
        verifyNetwork();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(address, ERC721_ABI, provider);
        const tokenTicker = await contract.symbol();
        return tokenTicker;
    }

    return {showToken}

}

export default showTokenTicker;