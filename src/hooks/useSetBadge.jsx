import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import useSetAccount from './useSetAccount';
import { setBadge } from '../store/slicers/badge';
import { huntersBadge } from '../contracts/huntersBadge';
import { verifyNetwork } from '../controllers/verifyNetwork';
import adjustEthersNumber from '../utils/adjustEthersNumber';

function useSetBadge() {

    const {account} = useSelector(state => state.accounts)
    const dispatch = useDispatch();
    // const {connectAccount} = useSetAccount();
    const {adjustNumber} = adjustEthersNumber();

    const setBadgeInfo = async () => {

        // if(!account) {
        //     await connectAccount();
        // }
        await verifyNetwork();
        
        let NFTContract = await huntersBadge();
        let tokenURI = await NFTContract.tokenURI(0)
        let xx = await tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
        let imgUrl = xx?.slice(xx.indexOf("https"),xx?.lastIndexOf("/"))
        await console.log(imgUrl)

        const totalNFT = await NFTContract.showTotalMint()
        const adjustedTotalNFT = await (adjustNumber(totalNFT)) * 10**18;
        const userStatus = await NFTContract.checkUser(account)
    
        let nftInfo = {
            nftCount: adjustedTotalNFT,
            userStatus: userStatus
        }
        console.log(nftInfo)
        await dispatch(setBadge(nftInfo));
    };

    return {setBadgeInfo};
}

export default useSetBadge