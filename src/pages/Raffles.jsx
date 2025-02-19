import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';

import FeatureRaffle from '../components/RaffleComponents/FeatureRaffle';
import LatestRaffles from '../components/RaffleComponents/LatestRaffles';

function Raffles() {

  return (
    <>
    <div className='px-16 mt-12 mb-24 flex flex-col space-y-8'>
      <div className='w-full flex flex-row items-center justify-center mb-4'>
          <h1 className='text-6xl font-bold uppercase tracking-wider'>Most Valuable NFT Raffles</h1>
      </div>
      <div className='w-full flex flex-row space-x-10'>
        <div className='w-3/12'>
          <FeatureRaffle />
        </div>
        <div className='w-9/12'>
          <LatestRaffles /> 
        </div>
      </div>
    </div>
    </>
  )
}

export default Raffles