import {ethers} from "ethers";
import { verifyNetwork } from "../controllers/verifyNetwork";

const adjustEthersNumber = () => {

    const adjustNumber = async(number) => {
        
        verifyNetwork();

        const adjustNumber = await ethers.utils.formatEther(number)
        return adjustNumber;
    }

    return {adjustNumber}

}

export default adjustEthersNumber;