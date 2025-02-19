import React from 'react'
import Participant from './Participant'

function Participants({ticketBuyers}) {
  console.log(ticketBuyers)
  return (
    <>
    <div className='flex flex-col mt-8'>
      <div className='flex flex-row'>
        <p className='uppercase font-bold text-sm text-gray-600'>Wallet Address</p>
        {/* <p className='w-1/2 uppercase font-bold text-sm text-gray-600'>Ticket Bought</p> */}
      </div>
      <div className="overflow-y-auto h-80 overscroll-contain">
        {ticketBuyers?.map((item, index) => {
            return (
              <Participant buyerWallet={item} key={index}/>
            )
        })}
      </div>
    </div>
    </>
  )
}

export default Participants