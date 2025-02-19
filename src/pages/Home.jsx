import React from 'react'

import { BsLightningChargeFill } from "react-icons/bs";
import { MdOutlineSecurity } from "react-icons/md";
import { SiLinuxfoundation } from "react-icons/si";

function Home() {
  return (
    <>
      <div className='my-10 px-30'>
        <div className='flex flex-col space-y-2'>
          <h1 className='text-6xl font-bold text-blue-600 tracking-wider'>HuntersRaffle</h1>
          <h1 className='text-4xl font-bold'>Buy & Sold NFTs with Tickets</h1>
        </div>
        <div className='flex flex-row mt-8'>
          <div className='w-1/2'>
            <p className='text-lg'>HuntersRaffle is a based decentralized NFT Raffle App on Monad with hyper efficiency and user friendly experience</p>
          </div>
        </div>
        <div className='w-full flex flex-col space-y-4 lg:space-y-0 lg:flex-row space-x-0 lg:space-x-4 mt-16'>
          <div className='lg:w-1/3 flex flex-col space-y-2 items-start justify-start bg-gray-200  h-44 px-8 py-8 rounded-2xl'>
              <div className='flex flex-row items-center space-x-2 pt-2'>
                  <p className='text-4xl text-pink-500'><BsLightningChargeFill /></p>
                  <p className='text-2xl '>Hyper Efficiency</p>
              </div>
              <p className='text-lg text-gray-500'>Best price and 1000x capital efficiency powered by the Rhythm AMM technology</p>
          </div>
          <div className='lg:w-1/3 flex flex-col space-y-2 items-start justify-start bg-gray-200  h-44 px-8 py-8 rounded-2xl'>
              <div className='flex flex-row items-center space-x-2 pt-2'>
                  <p className='text-4xl text-pink-500'><MdOutlineSecurity /></p>
                  <p className='text-2xl '>Top Security</p>
              </div>
              <p className='text-lg text-gray-500'>A trusted codebase time tested for years and audited by top security firms</p>
          </div>
          <div className='lg:w-1/3 flex flex-col space-y-2 items-start justify-start bg-gray-200  h-44 px-8 py-8 rounded-2xl'>
              <div className='flex flex-row items-center space-x-2 pt-2'>
                  <p className='text-4xl text-pink-500'><SiLinuxfoundation /></p>
                  <p className='text-2xl '>Seamless UX</p>
              </div>
              <p className='text-lg text-gray-500'>Swap and earn easier than anywhere else, designed with user friendly in mind</p>
          </div>
        </div>
        <div className='mt-10'>
          <div className='flex flex-col space-y-2'>
            <h1 className='text-3xl font-bold text-blue-600'>Backed by</h1>
            <h1 className='text-4xl font-bold'>CoinHunters</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home