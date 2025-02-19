import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import useSetAccount from './useSetAccount';
import { setUserNfts } from '../store/slicers/accounts';
import axios from 'axios';

import { verifyNetwork } from '../controllers/verifyNetwork';
import parseEthers from '../utils/parseEthers';
import adjustEthersNumber from '../utils/adjustEthersNumber';
import showTokenTicker from '../utils/showTokenTicker';
import showURI from '../utils/showURI';

function useSetUserNfts() {

    const {account} = useSelector(state => state.accounts)
    const dispatch = useDispatch();
    const {connectAccount} = useSetAccount();
    const {parseEthersValue} = parseEthers();
    const {adjustNumber} = adjustEthersNumber();
    const {showToken} = showTokenTicker();
    const {showTokenURI} = showURI();

    const getUserNfts = async (userAddress) => {

        // if(!account) {
        //     await connectAccount();
        // }
        await verifyNetwork();
        
        // const response = await axios.get(`https://odyssey.storyscan.xyz/api/v2/addresses/${userAddress}/nft?type=ERC-721`);
        const response = await axios.get(`https://api.blockvision.org/v2/monad/account/nfts?address=${userAddress}&pageSize=5&pageIndex=1`, {headers: {
            'x-api-key': '2tGFVARQytkCwhCnqDgZoCo4Kbz'
        }});

        const nftsArray = await response.data.result.data;
        let array = [];
        console.log(nftsArray)
        for (let i = 0; i < nftsArray.length; i++) {

            let nftAddress = await nftsArray[i].contractAddress;
            let nftId;
            let nftName = await nftsArray[i].name;
            let nftURI = await nftsArray[i].image;
            let newItem;

            for (let j = 0; j < nftsArray[i].items.length; j++) {
                nftId = await nftsArray[i].items[j].tokenId

                newItem = await {
                    nftAddress: nftAddress,
                    nftId: nftId,
                    nftName: nftName,
                    nftURI: nftURI
                }
                await array.push(newItem); 
            }                   
        }
        console.log(array)
        await dispatch(setUserNfts(array));
    };

    return {getUserNfts};
}

export default useSetUserNfts