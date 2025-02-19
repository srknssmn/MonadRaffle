import React from 'react';
import { useSelector, useDispatch} from "react-redux";
import { toast } from 'react-toastify';
import useSetAccount from '../hooks/useSetAccount';
import { useRaffleContract } from '../contracts/raffleContract';
import { setTxModal } from '../store/slicers/txModal';

import useSetUserPortfolio from '../hooks/useSetUserPortfolio';

function cancelRaffle() {

    const dispatch = useDispatch();
    const {account} = useSelector(state => state.accounts)
    const {connectAccount} = useSetAccount();
    const {getUserRaffles} = useSetUserPortfolio();

    async function cancelCurrentRaffle(raffleAddress) {

        if(!account) {
            await connectAccount();
        }

        try {
            
            const contract = await useRaffleContract(raffleAddress);
            
            const txh = await contract.cancelLottery();
            await dispatch(setTxModal({open: true, type: 7}));
            await txh.wait();
            await dispatch(setTxModal(false));
            const hash = await txh.hash
            console.log(hash)

            await toast("Successfully Raffle Canceled!", {
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
    return {cancelCurrentRaffle};
}

export default cancelRaffle