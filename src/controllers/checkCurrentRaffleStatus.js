import React from 'react';
import { useSelector, useDispatch} from "react-redux";

import useSetAccount from '../hooks/useSetAccount';
import { useRaffleContract } from '../contracts/raffleContract';
import { checkRaffleTime } from './checkRaffleTime';
import adjustEthersNumber from '../utils/adjustEthersNumber';
import { setRaffleSituation } from '../store/slicers/raffles';

function checkCurrentRaffleStatus() {

    const dispatch = useDispatch();
    const {account} = useSelector(state => state.accounts)
    const {connectAccount} = useSetAccount();
    const {adjustNumber} = adjustEthersNumber();
    
    async function checkRaffleStatus(raffleAddress) {

        if(!account) {
            await connectAccount();
        }
            
        const contract = await useRaffleContract(raffleAddress);

        const lotteryFinishTime = await contract.getLotteryFinishTime();
        const adjustedLotteryFinishTime = await adjustNumber(lotteryFinishTime) * 10**18;;
        const raffleStatus = await checkRaffleTime(adjustedLotteryFinishTime);
        console.log("raffleStatus: ", raffleStatus)       
        
        await dispatch(setRaffleSituation(raffleStatus))
    }
    return {checkRaffleStatus};
}

export default checkCurrentRaffleStatus