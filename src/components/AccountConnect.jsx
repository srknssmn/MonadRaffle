import React from 'react'
import { useSelector } from 'react-redux';
import useSetAccount from '../hooks/useSetAccount';

import { LuWallet } from "react-icons/lu";

function AccountConnect() {

    const {account} = useSelector(state => state.accounts);
    const {connectAccount} = useSetAccount();

  return (
    
    <div className='flex flex-col items-center space-y-2 mt-10 py-20 px-10 bg-white rounded-xl shadow-lg'>
        <p className="text-2xl lg:text-3xl font-bold tracking-widest text-transparent bg-gradient-to-r bg-clip-text from-blue-800 to-gray-800 uppercase">HuntersRaffle</p>
        <h1 className='text-3xl font-semibold'>Welcome</h1>
        <p className='py-2'>Connect your wallet to explore Sepolia wonderland</p>
        <button onClick={() => {connectAccount()}} className='my-4 py-2 px-12 border-2 border-blue-800 rounded-xl flex flex-row items-center space-x-1 text-center font-semibold justify-center text-gray-600 hover:text-blue-800 tracking-widest hover:bg-gray-300 transition duration-500'>
            <p className=' px-1 py-1'><LuWallet /></p>
            <p>Connect</p>
        </button>
    </div>
  )
}

export default AccountConnect