import {ethers} from "ethers";
import { verifyNetwork } from "../controllers/verifyNetwork";
import moment from 'moment';

export const checkRaffleTime = async (adjustedLotteryFinishTime) => {

    verifyNetwork();
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const blockNumber = await provider.getBlockNumber()
    const blockTimestamp = await (await provider.getBlock(blockNumber)).timestamp

    let raffleStatus;

    if (adjustedLotteryFinishTime > blockTimestamp) {
        raffleStatus = true;
    } else {
        raffleStatus = false;
    }
    
    return (
        raffleStatus
    )
}