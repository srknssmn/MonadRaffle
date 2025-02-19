import React from 'react'
import { useDispatch } from 'react-redux';
import { setMyNftsModal } from '../store/slicers/myNftsModal';

function MyNft({nftAddress, nftId, nftName, nftURI, updateNFT}) {

    const dispatch = useDispatch();

    const pickNFT = () => {
        updateNFT({nftAddress, nftId})
        closeTokenModal();
    }

    const closeTokenModal = () => {
        dispatch(setMyNftsModal(false));
    }

  return (
    <div className='px-4 py-4'>
        <div className='items-center justify-center flex'>
            <div className='flex flex-col shadow-md rounded-b-lg'>
                <img className="h-80 w-80 rounded-t-lg" src={nftURI} alt=""/>
                <div className='flex flex-col space-y-1 items-center justify-center'>
                    <h3 className='font-semibold text-center text-base'>{nftName}</h3>
                    <h3 className='font-semibold text-center text-base'>#<span>{nftId}</span></h3>
                </div>
                <div className='flex flex-row items-center justify-center py-2 px-2 space-x-1'>
                    <button onClick={pickNFT} className='text-sm uppercase py-2 px-1 bg-green-800 text-gray-200 rounded-xl hover:bg-green-400 hover:text-gray-800 transition duration-700'>Pick NFT</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyNft