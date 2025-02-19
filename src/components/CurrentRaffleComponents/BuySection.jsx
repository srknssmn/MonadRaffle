import React, {useState, useEffect} from 'react'
import buyNFT from '../../controllers/buyNFT';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function BuySection({currentRaffle}) {

    const {buyTicket} = buyNFT();
    const [itemCount, setItemCount] = useState(1)

    const handleTicketDecrease = () => {
        if (itemCount > 1) {
            setItemCount(itemCount - 1)
        }
      }
    
      const handleTicketIncrease = () => {
          if (itemCount < Math.round(Number(currentRaffle?.currentTicket))) {
              setItemCount(itemCount + 1)
          }
      }
    
      const handleTicketValue = (event) => {
        setItemCount(event.target.value)
      }
    
      const handleBuyNFT = () => {
        console.log(currentRaffle?.raffleContract)
        console.log(itemCount)
        buyTicket(currentRaffle?.raffleContract, itemCount, currentRaffle?.ticketCost)
      }

  return (
    <div className='items-center justify-center flex flex-row space-x-1'>
        <div className='flex flex-col items-center justify-center bg-gray-200 py-10 px-20 space-y-4 rounded-2xl'>
            <div className='flex flex-row space-x-2'>
            <button onClick={handleTicketDecrease} className='bg-gray-800 px-3 py-2 rounded-xl'><FaMinus className='text-2xl text-white'/></button>
            <input value={itemCount} onChange={handleTicketValue} className='flex text-2xl items-center justify-center border-2 w-16 border-gray-500 width-3 font-bold text-center' type="number" disabled/>
            <button onClick={handleTicketIncrease} className='bg-gray-800 px-4 py-3 rounded-xl'><FaPlus className='text-2xl text-white'/></button>
            </div>
            <button onClick={handleBuyNFT} className='uppercase text-base font-bold py-2 px-4 bg-green-500 rounded-xl'>Buy Ticket</button>
        </div>
    </div>
  )
}

export default BuySection