import {ethers} from "ethers";
import { verifyNetwork } from "../controllers/verifyNetwork";

function parseEthers() {

    const parseEthersValue = async(tokenInAmount) => {
        
        verifyNetwork();

        let tokenValue = String(tokenInAmount)
        const amount = ethers.utils.parseEther(tokenValue)
        return amount;
    }

    return {parseEthersValue}
}

export default parseEthers