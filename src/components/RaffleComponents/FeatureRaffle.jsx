import React from 'react'
import { Link } from 'react-router-dom';
import { FaStopwatch } from "react-icons/fa";
import Space from '../../assets/images/space.jpg'
import HUNTERSRAFFLE from '../../assets/images/huntersrafflebadge.jpg';
import NFT2 from '../../assets/images/NFT2.jpg';
import NFT3 from '../../assets/images/NFT3.jpg';

import { NFT_COLLECTION1 } from '../../constants/address';
import { NFT_COLLECTION2 } from '../../constants/address';
import { NFT_COLLECTION3 } from '../../constants/address';

function FeatureRaffle() {
  return (
    <div className='shadow-md rounded-xl py-6 flex flex-col border-2 border-gray-100 items-center px-4'>
        <div className='w-full flex flex-col border-b-2 border-gray-200 pb-6 items-center justify-center'>
            <h2 className='text-2xl font-bold'>FEATURED</h2>
            <h2 className='text-2xl font-bold'>COLLECTIONS</h2>
        </div>        
        <div className='w-full flex flex-wrap justify-center items-center mt-4'>
            <div className='px-2 py-3'>
                <div className='items-center justify-center flex'>
                    <div className='flex flex-col shadow-md rounded-b-lg'> 
                        <img className="h-36 w-72 rounded-t-lg" src={HUNTERSRAFFLE} alt=""/>
                        <h3 className='py-1 font-semibold text-center text-2xl'>HuntersRaffle Badge</h3>
                        <div className='flex flex-row items-center justify-center py-4'>
                            <Link to={`/collection/${NFT_COLLECTION1}`} className='py-2 px-4 bg-gray-800 text-gray-200 rounded-xl hover:scale-90 transition duration-700'>
                                View Collection Raffles
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-2 py-3'>
                <div className='items-center justify-center flex'>
                    <div className='flex flex-col shadow-md rounded-b-lg'> 
                        <img className="h-36 w-72 rounded-t-lg" src={NFT2} alt=""/>
                        <h3 className='py-1 font-semibold text-center text-2xl'>Sample Collection</h3>
                        <div className='flex flex-row items-center justify-center py-4'>
                            <Link to={`/collection/${NFT_COLLECTION2}`} className='py-2 px-4 bg-gray-800 text-gray-200 rounded-xl hover:scale-90 transition duration-700'>
                                View Collection Raffles
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-2 py-3'>
                <div className='items-center justify-center flex'>
                    <div className='flex flex-col shadow-md rounded-b-lg'> 
                        <img className="h-36 w-72 rounded-t-lg" src={NFT3} alt=""/>
                        <h3 className='py-1 font-semibold text-center text-2xl'>Maradona 10</h3>
                        <div className='flex flex-row items-center justify-center py-4'>
                            <Link to={`/collection/${NFT_COLLECTION3}`} className='py-2 px-4 bg-gray-800 text-gray-200 rounded-xl hover:scale-90 transition duration-700'>
                                View Collection Raffles
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeatureRaffle