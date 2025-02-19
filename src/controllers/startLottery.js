import React,{useState} from 'react';
import { useSelector, useDispatch} from "react-redux";
import { toast } from 'react-toastify';

import useSetAccount from '../hooks/useSetAccount';
import { erc721Contract } from '../contracts/erc721Contract';
import { useRaffleContract } from '../contracts/raffleContract';
import { setTxModal } from '../store/slicers/txModal';

import useSetUserPortfolio from '../hooks/useSetUserPortfolio';

function startLottery() {

    const dispatch = useDispatch();
    const {account} = useSelector(state => state.accounts)
    const {connectAccount} = useSetAccount();
    const {getUserRaffles} = useSetUserPortfolio();

    async function startNewLottery(nftAddress, nftID, raffleContractAddress) {

        if(!account) {
            await connectAccount();
        }

        try {

            // Approve NFT
            let NFTContract = await erc721Contract(nftAddress)
            const state = await NFTContract.getApproved(nftID)

            if (state !== raffleContractAddress.toString()) {
                console.log(raffleContractAddress)
                const txn = await NFTContract.approve(raffleContractAddress.toString(), nftID);
                await dispatch(setTxModal({open: true, type: 1}));
                await txn.wait()
                await dispatch(setTxModal(false));
                console.log(txn)
            }

            // Start Lottery
            const raffleContract = await useRaffleContract(raffleContractAddress);
            const txhRaffle = await raffleContract.startLottery();
            await dispatch(setTxModal({open: true, type: 5}));
            await txhRaffle.wait();
            await dispatch(setTxModal(false));
            console.log(txhRaffle)
            const hashRaffle = await txhRaffle.hash
            console.log(hashRaffle)

            await toast("Raffle succesfully created and The lottery has started", {
                position: "top-right",
                autoClose: 5000
            });

            await getUserRaffles(account);
            
        } catch (error) {
            await dispatch(setTxModal(false));
            console.log("Error:", error)
            toast(error.reason, {
                position: "top-right",
                autoClose: 5000
            });
        }

    }
    return {startNewLottery};
}

export default startLottery