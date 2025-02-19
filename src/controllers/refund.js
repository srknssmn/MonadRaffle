import React from 'react';
import { useSelector, useDispatch} from "react-redux";
import { toast } from 'react-toastify';
import useSetAccount from '../hooks/useSetAccount';
import { useRaffleContract } from '../contracts/raffleContract';
import { setTxModal } from '../store/slicers/txModal';

function refund() {

    const dispatch = useDispatch();
    const {account} = useSelector(state => state.accounts)
    const {connectAccount} = useSetAccount();

    async function refundTicket(raffleAddress) {

        if(!account) {
            await connectAccount();
        }

        try {
            
            const contract = await useRaffleContract(raffleAddress);
            
            const txh = await contract.refundTicket();
            await dispatch(setTxModal({open: true, type: 4}));
            await txh.wait();
            await dispatch(setTxModal(false));
            const hash = await txh.hash
            console.log(hash)

            toast("Successfully Refunded!", {
                position: "top-right",
                autoClose: 5000
            });

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
    return {refundTicket};
}

export default refund