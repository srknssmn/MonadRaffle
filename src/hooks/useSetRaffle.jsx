import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setRaffle } from '../store/slicers/raffles';
import useSetAccount from './useSetAccount';
import { verifyNetwork } from '../controllers/verifyNetwork';
import { useRaffleContract } from '../contracts/raffleContract';
import moment from 'moment';
import adjustEthersNumber from '../utils/adjustEthersNumber';
import showTokenTicker from '../utils/showTokenTicker';
import showURI from '../utils/showURI';
import { getDateTime } from '../utils/getDateTime';


function useSetRaffle() {

    const {account} = useSelector(state => state.accounts)
    const dispatch = useDispatch();
    const {connectAccount} = useSetAccount();
    const {adjustNumber} = adjustEthersNumber();
    const {showToken} = showTokenTicker();
    const {showTokenURI} = showURI();

      const getRaffle = async (raffleContract) => {

        if(!account) {
            await connectAccount();
        }
        await verifyNetwork();
        
        const contract = await useRaffleContract(raffleContract);
        
        
        // const totalEntiries = await contract.ticketCost;
        // console.log(totalEntiries)
        // const adjustedTotalEntiries = (adjustNumber(totalEntiries)) * 10**18;
        // console.log(adjustedTotalEntiries)

        const nftInfo = await contract.getPoolInfo();
        await console.log(nftInfo)
        const nftContract = await nftInfo[0];
        const nftName = await showToken(nftInfo[0]);


        let nftId = await (adjustNumber(nftInfo[1])) * 10**18;
        let nftIdNumber = await Number(nftId)
        let nftIdNumberR = await Math.round(nftIdNumber)

        const ticketCost = await (adjustNumber(nftInfo[2]))
        const maxTicket = await (adjustNumber(nftInfo[3])) * 10**18;
        const RoundedMaxTicket = await Math.round(maxTicket)
        const currentTicket = await (adjustNumber(nftInfo[4])) * 10**18;
        const RoundedCurrentTicket = await Math.round(currentTicket) 
        const deadlineTime = await (adjustNumber(nftInfo[5])) * 10**18;
        const lotteryFinishTime = await contract.getLotteryFinishTime();
        const adjustedLotteryFinishTime = await adjustNumber(lotteryFinishTime) * 10**18;;
        const raffleStatus = await nftInfo[6]
        const lotteryAccomplished = await nftInfo[7]
        let nftURI = await showTokenURI(nftContract, nftIdNumberR)

        const ticketBuyers = await contract.getPlayers();
        const winnerAddress = await contract.getWinnerAddress();

        const dayTime = await getDateTime(adjustedLotteryFinishTime);
        const adjustedDayTime = await dayTime.format();

        const raffleItem = {
            raffleContract: raffleContract,
            nftContract: nftContract,
            nftName: nftName,
            nftId: nftIdNumberR,
            ticketCost: ticketCost,
            maxTicket: RoundedMaxTicket,
            currentTicket: RoundedCurrentTicket,
            deadlineTime: deadlineTime,
            lotteryFinishTime: adjustedDayTime,
            raffleStatus: raffleStatus,
            lotteryAccomplished: lotteryAccomplished,
            ticketBuyers: ticketBuyers,
            winnerAddress: winnerAddress,
            nftURI: nftURI
        }

        console.log(raffleItem)
        await dispatch(setRaffle(raffleItem));
    };

    return {getRaffle};
}

export default useSetRaffle;