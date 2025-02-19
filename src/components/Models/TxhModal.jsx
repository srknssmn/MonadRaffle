import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { setTxModal } from '../../store/slicers/txModal';

import CircularProgress from '@mui/material/CircularProgress';
import { IoMdClose } from "react-icons/io";

function TxhModal() {

    const dispatch = useDispatch();
    const {txModal} = useSelector(state => state.txModal)

    const closeTokenModal = () => {
        dispatch(setTxModal(false));
        console.log("deneme")
    }

  return (
    <div className='w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center'>
        <div className='bg-white px-4 rounded-xl'>
            <div className='flex flex-row items-center justify-between pt-2'>
                <h1 className='font-bold text-2xl'></h1>
                <IoMdClose className='cursor-pointer' onClick={closeTokenModal} size={25}/>
            </div>
            <div className='flex flex-col items-center justify-center pt-14 pb-20'>
                <div className='py-10'>
                    <CircularProgress />
                </div>
                {txModal.type == 1 ? <p className='text-2xl font-bold'>Unlock NFT</p> : ""}
                {txModal.type == 2 ? <p className='text-2xl font-bold'>Create Raffle</p> : ""}
                {txModal.type == 3 ? <p className='text-2xl font-bold'>Buy Ticket</p> : ""}
                {txModal.type == 4 ? <p className='text-2xl font-bold'>Refund Ticket</p> : ""}
                {txModal.type == 5 ? <p className='text-2xl font-bold'>Start Lottery</p> : ""}
                {txModal.type == 6 ? <p className='text-2xl font-bold'>Winner Select</p> : ""}
                {txModal.type == 7 ? <p className='text-2xl font-bold'>Raffle Cancel</p> : ""}
                {txModal.type == 8 ? <p className='text-2xl font-bold'>Mint NFT</p> : ""}
                {txModal.type == 9 ? <p className='text-2xl font-bold'>Balance Withdraw</p> : ""}
                <p className='text-xl font-semibold'>Transaction Approving..</p>
            </div>
        </div>
    </div>
  )
}

export default TxhModal