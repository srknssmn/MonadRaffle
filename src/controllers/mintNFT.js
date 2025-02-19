import React from 'react';
import { useSelector, useDispatch} from "react-redux";
import { toast } from 'react-toastify';
import useSetAccount from '../hooks/useSetAccount';
import { huntersBadge } from '../contracts/huntersBadge';
import { verifyNetwork } from '../controllers/verifyNetwork';
import { setTxModal } from '../store/slicers/txModal';
import useSetBadge from '../hooks/useSetBadge';

function mintNFT() {

    const {account} = useSelector(state => state.accounts)
    const dispatch = useDispatch();
    const {connectAccount} = useSetAccount();
    const {setBadgeInfo} = useSetBadge();

    const mintHuntersBadge = async () => {

        if(!account) {
            await connectAccount();
        }
        await verifyNetwork();
        
        let NFTContract = await huntersBadge();

        const txh = await NFTContract.safeMint();
        await dispatch(setTxModal({open: true, type: 8}));
        await txh.wait();
        await dispatch(setTxModal(false));
        const hash = await txh.hash
        console.log(hash)

        await setBadgeInfo();
    };

    return {mintHuntersBadge};
}

export default mintNFT