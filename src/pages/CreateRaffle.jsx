import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import TxhModal from '../components/Models/TxhModal';
import MyNftsModal from '../components/Models/MyNftsModal';
import AccountConnect from '../components/AccountConnect';
import createRaffle from '../controllers/createRaffle'
import { setMyNftsModal } from '../store/slicers/myNftsModal';
import { MdOutlineCreateNewFolder } from "react-icons/md";

function CreateRaffle() {

    const dispatch = useDispatch();
    const {account} = useSelector(state => state.accounts);
    const {txModal} = useSelector(state => state.txModal)
    const {myNftsModal} = useSelector(state => state.myNftsModal)
    const {createNewRaffle} = createRaffle();

    const [nftAddress, setNftAddress] = useState(null)
    const [nftID, setNftID] = useState(null)
    const [ticketCost, setTicketCost] = useState(null)
    const [maxTicket, setMaxTicket] = useState(null)
    const [deadlineTime, setDeadlineTime] = useState(86400)

    const handleNFTAddress = async (e) => {
      setNftAddress(e.target.value)
    }

    const handleNFTID = async (e) => {
      setNftID(e.target.value)
    }

    const handleTicketCost = async (e) => {
      setTicketCost(e.target.value)
    }

    const handleMaxTicket = async (e) => {
      setMaxTicket(e.target.value)
    }

    const handleDeadlineTime = async (e) => {
      setDeadlineTime(e.target.value)
      console.log(deadlineTime)
    }

    const createRaffleHandle = async () => {
        await createNewRaffle(nftAddress, nftID, ticketCost, maxTicket, deadlineTime)
    }

    const handleMyNftsModal = () => {
      dispatch(setMyNftsModal(true));
    }

    const handleUpdateNFT = (item) => {
      console.log(item)
      setNftAddress(item.nftAddress);
      setNftID(item.nftId)
    } 
    
  return (
    <>
    {txModal && <TxhModal />}
    {myNftsModal && <MyNftsModal updateNFT={handleUpdateNFT}/>}
        <div className='my-10 px-30 items-center justify-center'>
        <h1 className='text-6xl font-semibold mb-20 uppercase text-center'>Create New Raffle</h1>
            {account ? 
            <div className='w-full flex flex-row'>
              <div className='w-1/2 flex items-center justify-center'>
                <button onClick={handleMyNftsModal} className='flex flex-col items-center justify-center'>
                  <MdOutlineCreateNewFolder className='text-6xl'/>
                  <span className='uppercase text-xl'>Select from own NFTs</span>
                </button>
              </div>
              <div className='w-1/2'>
                <div className='flex flex-col space-y-2'>
                  <div className='flex flex-row space-x-2 items-center'>
                    <input onChange={handleNFTAddress} value={nftAddress} type="text" className="w-2/3 py-1 px-4 border-2 border-black shadow-sm rounded-lg text-xl font-semibold focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
                    <label>NFT Contract Address</label>
                  </div>
                  <div className='flex flex-row space-x-2 items-center'>
                    <input onChange={handleNFTID} value={nftID} type="number" min={0} className="w-2/3 py-1 px-4 border-2 border-black shadow-sm rounded-lg text-xl font-semibold focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
                    <label>NFT ID</label>
                  </div>
                  <div className='flex flex-row space-x-2 items-center'>
                    <input onChange={handleTicketCost} value={ticketCost} type="number" min={0.000001} className="w-2/3 py-1 px-4 border-2 border-black shadow-sm rounded-lg text-xl font-semibold focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
                    <label>Ticket Cost (IP)</label>
                  </div>
                  <div className='flex flex-row space-x-2 items-center'>
                    <input onChange={handleMaxTicket} value={maxTicket} type="number" min={0} className="w-2/3 py-1 px-4 border-2 border-black shadow-sm rounded-lg text-xl font-semibold focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
                    <label>Total Tickets</label>
                  </div>
                  <div className='flex flex-row space-x-2 items-center mb-4'>
                    <select value={deadlineTime} onChange={handleDeadlineTime} className="w-2/3 py-1 px-4 border-2 border-black shadow-sm rounded-lg text-xl font-semibold focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                      <option selected value="86400">1 Day</option>
                      <option value="259200">3 Days</option>
                      <option value="604800">7 Days</option>
                    </select>
                    <label>Raffle Duration</label>
                  </div>
                  <button onClick={createRaffleHandle} className='px-10 py-3 bg-gray-400 rounded-2xl font-bold text-xl'>Create Raffle</button>
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

export default CreateRaffle