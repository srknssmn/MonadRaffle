import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import AccountConnect from '../components/AccountConnect';
import useSetRaffle from '../hooks/useSetRaffle';
import TxhModal from '../components/Models/TxhModal';

import Details from '../components/CurrentRaffleComponents/Details';
import Participants from '../components/CurrentRaffleComponents/Participants';
import Winner from '../components/CurrentRaffleComponents/Winner';

import { HiOutlineStatusOnline } from "react-icons/hi";
import { HiOutlineStatusOffline } from "react-icons/hi";

import Penguin from '../assets/images/penguin.jpg'

function Raffle() {

  const {account} = useSelector(state => state.accounts);
  const { raffleContract } = useParams();
  const {currentRaffle} = useSelector(state => state.raffles);
  const {currentRaffleSituation} = useSelector(state => state.raffles);
  const {txModal} = useSelector(state => state.txModal)
  const { getRaffle } = useSetRaffle();

  const [tab, setTab] = useState("details")

  const handleTab = (e) => {
    setTab(e.target.id)
    console.log(tab)
  }

  useEffect(() => {
    const work = async () => {
      getRaffle(raffleContract);
    };
    work();
  }, []);

  return (
    <>
      {txModal && <TxhModal />}
      <div className='my-10 mx-10'>
      {account ? 

        <div className='w-full flex flex-row space-x-4'>
          <div className='w-1/3 flex flex-col items-center justify-center space-y-4 bg-gray-100 rounded-xl py-10 px-10'>
            <img className="h-100 w-100 rounded-lg" src={currentRaffle?.nftURI} alt=""/>
            <div className='flex flex-row space-x-2 font-bold text-2xl'>
              <p>{currentRaffle?.nftName}</p>
              <p>#{currentRaffle?.nftId}</p>
            </div>
          </div>
          <div className='w-2/3 flex flex-col bg-gray-100 rounded-xl py-10 px-10'>
            <div className='flex flex-row justify-between border-b-2 border-gray-200 pb-4'>
              <div className='flex flex-row space-x-4'>
                {tab === "details" ?
                    <button onClick={handleTab} id="details" className='uppercase text-white font-bold bg-gray-800 px-2 py-2 rounded-xl'>Raffle Details</button>
                    :
                    <button onClick={handleTab} id="details" className='uppercase font-bold bg-gray-200 px-2 py-2 rounded-xl'>Raffle Details</button>
                }
                {tab === "participants" ?
                    <button onClick={handleTab} id="participants" className='uppercase text-white font-bold bg-gray-800 px-2 py-2 rounded-xl'>Participants</button>
                    :
                    <button onClick={handleTab} id="participants" className='uppercase font-bold bg-gray-200 px-2 py-2 rounded-xl'>Participants</button>
                }
                {tab === "winner" ?
                    <button onClick={handleTab} id="winner" className='uppercase text-white font-bold bg-gray-800 px-2 py-2 rounded-xl'>Winner</button>
                    :
                    <button onClick={handleTab} id="winner" className='uppercase font-bold bg-gray-200 px-2 py-2 rounded-xl'>Winner</button>
                }
              </div>
              <div className='flex flex-col space-y-1 items-center justify-center'>
                <p className='uppercase font-bold text-sm text-gray-600'>Raffle Status</p>
                <div>{currentRaffle?.raffleStatus && currentRaffleSituation ? <div className='flex flex-row items-center space-x-1'><HiOutlineStatusOnline className='text-green-400 font-bold text-xl animate-pulse'/><p>Online</p></div> : <div className='flex flex-row items-center space-x-1'><HiOutlineStatusOffline className='text-red-400 font-bold text-xl'/><p>Offline</p></div>}</div>
              </div>
            </div>
            <div>
              {
                (() => {
                  if (tab === "details"){
                  return <Details currentRaffle={currentRaffle}></Details>
                  } else if (tab === "participants") {
                  return <Participants ticketBuyers={currentRaffle?.ticketBuyers}></Participants>
                  } else if (tab === "winner") {
                  return <Winner winnerAddress={currentRaffle?.winnerAddress}></Winner>
                  }
                })()
                }
            </div>
          </div>
        </div>
      
      : 
      <div className='w-full flex items-center justify-center'>
        <AccountConnect /> 
      </div>
      }
        
      </div>
    </>
  )
}

export default Raffle