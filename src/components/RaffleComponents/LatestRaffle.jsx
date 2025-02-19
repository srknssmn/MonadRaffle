import React from 'react'
import { Link } from 'react-router-dom';

import Penguin from '../../assets/images/penguin.jpg';

function LatestRaffle({raffleAddress, nftAddress, nftId, ticketCost, maxTicket, currentTicket, raffleStatus, nftName, nftURI}) {
  return (
    <div className='px-4 py-4'>
        <div className='items-center justify-center flex'>
            <div className='flex flex-col shadow-md rounded-b-lg'>
                <img className="h-72 w-72 rounded-t-lg" src={nftURI} alt=""/>
                <div className='flex flex-row space-x-1 items-center justify-center'>
                    <h3 className='py-1 font-semibold text-center text-2xl'>{nftName}</h3>
                    <h3 className='py-1 font-semibold text-center text-2xl'>#<span>{nftId}</span></h3>
                </div>
                <div className='flex flex-row items-center justify-between py-2 px-2'>
                    <div className='flex flex-col'>
                        <h4 className='text-gray-800 font-semibold'>Tickets</h4>
                        <p className='font-bold'><span>{currentTicket}</span>/<span>{maxTicket}</span></p>
                    </div>
                    <div className='flex flex-col'>
                        <h4 className='text-gray-800 font-semibold'>Ticket Price</h4>
                        <p><span>{ticketCost}</span> <span className='font-bold text-xs'>IP</span></p>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center py-2 px-2'>
                    <Link to={`/raffles/${raffleAddress}`} className='py-2 px-4 bg-gray-800 text-gray-200 rounded-xl hover:scale-90 transition duration-700'>
                        Enter Raffle
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LatestRaffle