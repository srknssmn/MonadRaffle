import React from 'react'

function Participant({buyerWallet}) {

    let first = buyerWallet.slice(0, 6)
    let last = buyerWallet.slice(-6)
    let playerAddress = first + " ........... " + last

  return (
    <div className='py-2 text-xl font-bold'>{playerAddress}</div>
  )
}

export default Participant