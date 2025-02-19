import React from 'react'
import { Link } from 'react-router-dom';
import RaffleStatus from './RaffleStatus';
// import BuySection from './BuySection';
import RefundSection from './RefundSection';
import moment from 'moment';

import { FaStopwatch } from "react-icons/fa";
import { BsArrowUpRightSquareFill } from "react-icons/bs";

function Details({currentRaffle}) {

      const relativeTime = (x) => {
        console.log("DENEME: ", currentRaffle?.lotteryFinishTime)
        return moment(x).calendar(); 
      }

  return (
    <div className='flex flex-row items-start justify-center mt-8 space-x-4'>
        <div className='w-1/2 space-y-4 border-r-2 border-gray-200'>
            <div className='flex flex-col space-y-1'>
                <p className='uppercase font-bold text-sm text-gray-600'>NFT Collection</p>
                <div className='flex flex-row items-center space-x-2'>
                    <p className='text-2xl font-semibold'>{currentRaffle?.nftName}</p>
                    <Link to={`/collection/${currentRaffle?.nftContract}`}>
                        <BsArrowUpRightSquareFill className="text-xl"/>
                    </Link>
                </div>
            </div>
            <div className='flex flex-col space-y-1'>
                <p className='uppercase font-bold text-sm text-gray-600'>Ticket Price</p>
                <p><span className='text-2xl font-semibold'>{currentRaffle?.ticketCost}</span> <span className='font-bold text-xs'>IP</span></p>
            </div>
            <div className='flex flex-col space-y-1'>
                <p className='uppercase font-bold text-sm text-gray-600'>Tickets Remaining</p>
                <div className='flex flex-row items-center space-x-2'>
                    <p className='text-2xl font-semibold'>{currentRaffle?.currentTicket}</p>
                    <p>/</p>
                    <p className='text-2xl font-semibold'>{currentRaffle?.maxTicket}</p>
                </div>
            </div>
            <div className='flex flex-col space-y-1'>
                <p className='uppercase font-bold text-sm text-gray-600'>Raffle Period</p>
                <p className='text-2xl font-semibold'>
                    {currentRaffle?.deadlineTime == 86400 ? "1 Day" : currentRaffle?.deadlineTime == 259200 ? "3 Day" : currentRaffle?.deadlineTime == 604800 ? "1 Week" : "space"}
                </p>
            </div>
            <div className='flex flex-col space-y-1'>
                <p className='uppercase font-bold text-sm text-gray-600'>Raffle Ends in</p>
                <div className='flex flex-row space-x-1 items-center'>
                    <FaStopwatch className='text-blue-600 text-xl'/>
                    <p><span className='text-2xl font-semibold'>{relativeTime(currentRaffle?.lotteryFinishTime)}</span></p>
                </div>
            </div>
        </div>
        <div className='w-1/2 flex items-center justify-center py-20'>
            <RaffleStatus currentRaffle={currentRaffle}/>
        </div>
    </div>
  )
}

export default Details