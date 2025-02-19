import React from 'react'

function Winner({winnerAddress}) {

  let first = winnerAddress.slice(0, 6)
  let last = winnerAddress.slice(-6)
  let playerAddress = first + " ........... " + last

  return (
    <>
    <div className='flex flex-col mt-8'>
      <div>{winnerAddress == "0x0000000000000000000000000000000000000000" ? <p>Raffle not drawn yet</p> : 
      <div className='flex flex-row items-center space-x-2'>
        <p className='uppercase font-bold text-sm text-gray-600'>Winner:</p>
        <p className='text-xl font-bold'>{playerAddress}</p>
      </div> }</div>
    </div>
    </>
  )
}

export default Winner