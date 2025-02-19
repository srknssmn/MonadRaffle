import React from 'react';
import { useSelector, useDispatch } from "react-redux";
;import useSetAccount from './useSetAccount';
import { setLatestLiveRaffles } from '../store/slicers/raffles';
import { useRaffleFactoryContract } from '../contracts/raffleFactory';
import { verifyNetwork } from '../controllers/verifyNetwork';
import parseEthers from '../utils/parseEthers';
import adjustEthersNumber from '../utils/adjustEthersNumber';
import showTokenTicker from '../utils/showTokenTicker';
import showURI from '../utils/showURI';

function useSetLatestLiveRaffles() {

    const {account} = useSelector(state => state.accounts)
    const dispatch = useDispatch();
    const {connectAccount} = useSetAccount();
    const {parseEthersValue} = parseEthers();
    const {adjustNumber} = adjustEthersNumber();
    const {showToken} = showTokenTicker();
    const {showTokenURI} = showURI();

    const getLatestLiveRaffles = async () => {

        if(!account) {
            await connectAccount();
        }
        await verifyNetwork();
        
        const contract = await useRaffleFactoryContract();
        const rafflesArray = await contract.getRaffleDetails();
        console.log(rafflesArray.length)

        let array = [];

        for (let i = rafflesArray.length; i > 0; i--) {

            let raffleAddress = rafflesArray[i-1][1]
            let nftAddress = rafflesArray[i-1][2]

            let nftId = await (adjustNumber(rafflesArray[i-1][3])) * 10**18;
            let nftIdNumber = await Number(nftId)
            let nftIdNumberR = await Math.round(nftIdNumber)

            let ticketCost = await (adjustNumber(rafflesArray[i-1][4]))
            let maxTicket = await (adjustNumber(rafflesArray[i-1][5])) * 10**18;
            const RoundedMaxTicket = await Math.round(maxTicket)
            let currentTicket = await (adjustNumber(rafflesArray[i-1][6])) * 10**18;
            const RoundedCurrentTicket = await Math.round(currentTicket) 
            let raffleStatus = rafflesArray[i-1][8]
            let lotteryAccomplished = rafflesArray[i-1][9]

            let nftName = await showToken(nftAddress);
            let nftURI = await showTokenURI(nftAddress, nftIdNumberR);
            
            let newItem = await {
                0: raffleAddress,
                1: nftAddress,
                2: nftIdNumberR,
                3: ticketCost,
                4: RoundedMaxTicket,
                5: RoundedCurrentTicket,
                6: raffleStatus,
                7: nftName,
                8: lotteryAccomplished,
                9: nftURI
            }
            
            if ((newItem[6] == true) && (array.length < 6)) {
                await array.push(newItem);
            }        
        }
        console.log(array)
        await dispatch(setLatestLiveRaffles(array));
    };

    return {getLatestLiveRaffles};
}

export default useSetLatestLiveRaffles