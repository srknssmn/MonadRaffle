import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import useSetAccount from './useSetAccount';

import { setCollections } from '../store/slicers/collections';
import { useRaffleFactoryContract } from '../contracts/raffleFactory';
import { verifyNetwork } from '../controllers/verifyNetwork';

function useSetCollections() {

    const {account} = useSelector(state => state.accounts)
    const dispatch = useDispatch();
    const {connectAccount} = useSetAccount();

      const getCollections = async () => {

        if(!account) {
            await connectAccount();
        }
        await verifyNetwork();
        
        const contract = await useRaffleFactoryContract();
        const nftCollection = await contract.getNFTCollectionRaffleList();

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
        await dispatch(setCollections(array));
    };

    return {getCollections};
}

export default useSetCollections