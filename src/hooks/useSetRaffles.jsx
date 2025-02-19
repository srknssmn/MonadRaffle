import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import useSetAccount from './useSetAccount';
import { setRaffles } from '../store/slicers/raffles';
import { useRaffleFactoryContract } from '../contracts/raffleFactory';
import { verifyNetwork } from '../controllers/verifyNetwork';

function useSetRaffles() {

    const {account} = useSelector(state => state.accounts)
    const dispatch = useDispatch();
    const {connectAccount} = useSetAccount();

    const getRaffles = async () => {

        if(!account) {
            await connectAccount();
        }
        await verifyNetwork();
        
        const contract = await useRaffleFactoryContract();
        const rafflesArray = await contract.getRaffleDetails();

        let array = [];
        
        for (let i = 0; i < rafflesArray.length; i++) {

            let raffleAddress = rafflesArray[i][1]
            let nftAddress = rafflesArray[i][2]
            let nftId = rafflesArray[i][3]
            let raffleStatus = rafflesArray[i][4]
            
        let newItem = await {
            0: raffleAddress,
            1: nftAddress,
            2: nftId,
            3: raffleStatus
        }
        await array.push(newItem);
        }
        console.log(array)
        await dispatch(setRaffles(array));
    };

    return {getRaffles};
}

export default useSetRaffles