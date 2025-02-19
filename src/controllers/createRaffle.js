import React,{useState} from 'react';
import { useSelector, useDispatch} from "react-redux";
import { toast } from 'react-toastify';

import useSetAccount from '../hooks/useSetAccount';
import { erc721Contract } from '../contracts/erc721Contract';
import { useRaffleFactoryContract } from '../contracts/raffleFactory';
import { useRaffleContract } from '../contracts/raffleContract';
import { setTxModal } from '../store/slicers/txModal';
import parseEthers from '../utils/parseEthers';

import startLottery from './startLottery';

function createRaffle() {

    const dispatch = useDispatch();
    const {account} = useSelector(state => state.accounts)
    const {connectAccount} = useSetAccount();
    const {parseEthersValue} = parseEthers();
    const {startNewLottery} = startLottery();

    async function createNewRaffle(nftAddress, nftID, ticketCost, maxTicket, deadlineTime) {

        if(!account) {
            await connectAccount();
        }

        try {

            // Create Raffle
            const contract = await useRaffleFactoryContract();
            console.log(contract)
            console.log(nftAddress, nftID, ticketCost, maxTicket, deadlineTime)

            const amount = await parseEthersValue(ticketCost);
            const txh = await contract.createNewRaffle(nftAddress, nftID, amount, maxTicket, deadlineTime);
            await dispatch(setTxModal({open: true, type: 2}));
            await txh.wait();
            await dispatch(setTxModal(false));
            console.log(txh)

            const collectionRafflesArray = await contract.getUSerRaffleDetails(account);
    
            let raffleContractAddress;
    
            for (let i = collectionRafflesArray.length; i > 0; i--) {
    
                raffleContractAddress = await collectionRafflesArray[i-1][1]
                console.log(raffleContractAddress);
                break;
            }

            await startNewLottery(nftAddress, nftID, raffleContractAddress);

            // // Approve NFT
            // let NFTContract = await erc721Contract(nftAddress)
            // const state = await NFTContract.getApproved(nftID)

            // if (state !== raffleContractAddress.toString()) {
            //     console.log(raffleContractAddress)
            //     const txn = await NFTContract.approve(raffleContractAddress.toString(), nftID);
            //     await dispatch(setTxModal({open: true, type: 1}));
            //     await txn.wait()
            //     await dispatch(setTxModal(false));
            //     console.log(txn)
            // }

            // // Start Lottery
            // const raffleContract = await useRaffleContract(raffleContractAddress);
            // const txhRaffle = await raffleContract.startLottery();
            // await dispatch(setTxModal({open: true, type: 5}));
            // await txhRaffle.wait();
            // await dispatch(setTxModal(false));
            // console.log(txhRaffle)
            // const hashRaffle = await txhRaffle.hash
            // console.log(hashRaffle)

            // toast("Raffle succesfully created and The lottery has started", {
            //     position: "top-right",
            //     autoClose: 5000
            // });
            
        } catch (error) {
            await dispatch(setTxModal(false));
            console.log("Error:", error)
            toast(error.reason, {
                position: "top-right",
                autoClose: 5000
            });
        }

    }
    return {createNewRaffle};
}

export default createRaffle