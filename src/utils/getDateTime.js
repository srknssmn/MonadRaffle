import {ethers} from "ethers";
import { verifyNetwork } from "../controllers/verifyNetwork";
import moment from 'moment';

export const getDateTime = async (adjustedLotteryFinishTime) => {

    verifyNetwork();
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const blockNumber = await provider.getBlockNumber()
    const blockTimestamp = await (await provider.getBlock(blockNumber)).timestamp

    const timeDifference = await adjustedLotteryFinishTime - blockTimestamp

    let currentseconds = Number(timeDifference);
    let d = Math.floor(currentseconds / (3600*24));
    let h = Math.floor(currentseconds % (3600*24) / 3600);
    let m = Math.floor(currentseconds % 3600 / 60);
    let s = Math.floor(currentseconds % 60);

    let dDisplay = d > 0 ? d : 0;
    let hDisplay = h > 0 ? h : 0;
    let mDisplay = m > 0 ? m : 0;
    let sDisplay = s > 0 ? s : 0;

    const timeInfo = {
        dDisplay: dDisplay,
        hDisplay: hDisplay,
        mDisplay: mDisplay,
        sDisplay: sDisplay
    }

    const dateNow = await moment();  

    const day = await dateNow.get('date');
    const hour = await dateNow.get('hour');
    const minutes = await dateNow.get('minute');
    const seconds = await dateNow.get('second');
    
    if (timeInfo.dDisplay > 0) {
        let newDay = await day + Number(timeInfo.dDisplay)
        await dateNow.set('date', newDay);
    }

    if (timeInfo.hDisplay > 0) {
        let newHour = await hour + Number(timeInfo.hDisplay)
        await dateNow.set('hour', newHour);
    }

    if (timeInfo.mDisplay > 0) {
        let newMinutes = await minutes + Number(timeInfo.mDisplay)
        await dateNow.set('minute', newMinutes);
    }

    if (timeInfo.sDisplay > 0) {
        let newSeconds = await seconds + Number(timeInfo.sDisplay)
        await dateNow.set('second', newSeconds);
    }

    return (
        dateNow
    )
}