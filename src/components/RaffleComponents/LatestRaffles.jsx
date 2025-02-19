import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LatestRaffle from './LatestRaffle';

import AccountConnect from '../AccountConnect';
import useSetLatestLiveRaffles from '../../hooks/useSetLatestLiveRaffles';

import { TbStars } from "react-icons/tb";

function LatestRaffles() {

    const {account} = useSelector(state => state.accounts);
    const { getLatestLiveRaffles } = useSetLatestLiveRaffles();
    const {latestLiveRaffles} = useSelector(state => state.raffles)

    useEffect(() => {
        const work = async () => {
            getLatestLiveRaffles();
        };
        work();
    }, []);

  return (
    <div className='shadow-md rounded-xl py-6 flex flex-col border-2 border-gray-100 px-4'>
        <div className='flex flex-col space-y-2 mb-3 border-b-2 border-gray-200 pb-4'>
            <div className='flex flex-row items-center space-x-2'>
                <TbStars className='text-4xl font-semibold text-blue-600' />
                <h1 className='text-4xl font-bold uppercase'>Latest Live Raffles</h1>
            </div>
            <p className='text-gray-500'>View my liquidity and staking earnings and manage earned rewards</p>
        </div>
        {account ?
        
        <div className='flex flex-col'>
            <div className='w-full flex flex-wrap justify-center items-center'>

            {latestLiveRaffles.length > 0
              ? latestLiveRaffles.map((item, i) => {
                  return (
                    <LatestRaffle 
                      key={i}
                      raffleAddress={item[0]}
                      nftAddress={item[1]}
                      nftId={item[2]}
                      ticketCost={item[3]}
                      maxTicket={item[4]}
                      currentTicket={item[5]}
                      raffleStatus={item[6]}
                      nftName={item[7]}
                      nftURI={item[9]}
                    />
                  );
                })
              : "Loading..."}
            </div>
            <div className='flex items-center justify-center mt-4'>
                <Link to="/allraffles" className='uppercase font-bold text-xl py-2 px-20 text-transparent bg-gradient-to-r bg-clip-text from-blue-800 to-gray-800 hover:scale-90 transition duration-700'>
                  SEE ALL Raffles
                </Link>
            </div>
        </div>
          :
        <AccountConnect />          
        }

    </div>
  )
}

export default LatestRaffles