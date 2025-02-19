import React from 'react';
import { useSelector, useDispatch} from "react-redux";
import { toast } from 'react-toastify';
import useSetAccount from '../hooks/useSetAccount';
import { useRaffleContract } from '../contracts/raffleContract';
import { setTxModal } from '../store/slicers/txModal';

import useSetUserPortfolio from '../hooks/useSetUserPortfolio';

function pickWinner() {

    const dispatch = useDispatch();
    const {account} = useSelector(state => state.accounts)
    const {connectAccount} = useSetAccount();
    const {getUserRaffles} = useSetUserPortfolio();

    async function pickRaffleWinner(raffleAddress) {

        if(!account) {
            await connectAccount();
        }

        try {
            
            const contract = await useRaffleContract(raffleAddress);
            
            const txh = await contract.pickWinner();
            await dispatch(setTxModal({open: true, type: 6}));
            await txh.wait();
            await dispatch(setTxModal(false));
            const hash = await txh.hash
            console.log(hash)

            await toast("Successfully Winner Selected!", {
                position: "top-right",
                autoClose: 5000
            });

            await getUserRaffles(account);

        } catch (error) {
            console.log(error)
            await dispatch(setTxModal(false));
            console.log("Error:", error.reason)
            toast(error.reason, {
                position: "top-right",
                autoClose: 5000
            });
        }


    }
    return {pickRaffleWinner};
}

export default pickWinner