import React from 'react'
import refund from '../../controllers/refund'

function RefundSection({currentRaffle}) {

  const {refundTicket} = refund();

  const handleRefundNFT = () => {
    refundTicket(currentRaffle?.raffleContract)
  }

  return (
    <>
    {currentRaffle?.lotteryAccomplished ? 
    
    "Raffle completed successfully and Winner selected!"
    
    :
      
      <div>
        <p>Waiting for Raffle Owner for Pick Winner</p>
        <button onClick={handleRefundNFT} className='uppercase text-base font-bold py-2 px-4 bg-red-500 rounded-xl'>REFUND</button>
      </div>
    }

    </>
  )
}

export default RefundSection