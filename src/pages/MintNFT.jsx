import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import TxhModal from '../components/Models/TxhModal';
import AccountConnect from '../components/AccountConnect';
import useSetBadge from '../hooks/useSetBadge';
import { HUNTERS_NFT_COLLECTION } from "../constants/address";
import HuntersRaffle from '../assets/images/huntersraffle.png';
import mintNFT from '../controllers/mintNFT';
import { FaCopy } from "react-icons/fa";

function MintNFT() {

    const {account} = useSelector(state => state.accounts);
    const {txModal} = useSelector(state => state.txModal)
    const {badge} = useSelector(state => state.badge)

    const {mintHuntersBadge} = mintNFT();
    const {setBadgeInfo} = useSetBadge();

    useEffect(() => {
        const work = async () => {
            setBadgeInfo();
        };
        work();
      }, [account]);

    const handleMint = () => {
        mintHuntersBadge();
    }

  return (
    <>
    {txModal && <TxhModal />}
    <div className='w-full px-30 my-10'>
        <div className='flex flex-col'>
            <h1 className='text-6xl font-semibold mb-10 uppercase text-center'>Mint NFT</h1>
            <div className='flex flex-row px-20 lg:space-x-10'>
                <div className='lg:w-1/2 items-center px-4 lg:border-r-2 lg:border-black'>
                    <div className='m-10 flex items-center justify-center drop-shadow-2xl'>
                        <img className='rounded-lg drop-shadow-xl' src={HuntersRaffle} alt="" />
                    </div>
                </div>
                <div className='lg:w-1/2 items-center px-4'>
                    <div className='my-10 flex flex-col'>
                        <h1 className='text-4xl font-extrabold uppercase'>HuntersRaffle Badge</h1>
                        <div className="my-4 flex flex-row space-x-2 px-2">
                            <p className='uppercase text-base font-bold text-gray-600'>NFT Contract:</p>
                            <input className='px-4 border-2 border-gray-400 rounded-lg' value={HUNTERS_NFT_COLLECTION} type="text" disabled/>
                            <button onClick={() =>  navigator.clipboard.writeText(`${HUNTERS_NFT_COLLECTION}`)}>
                                <FaCopy />
                            </button>
                        </div>
                        <div className='my-6 p-4 border-2 border-gray-400 rounded-lg bg-gray-400'>
                            <h4 className="uppercase text-base font-bold text-gray-600 underline tracking-wider">Mint Info</h4>
                            <div className='flex flex-row space-x-2 my-3'>
                                <p className='font-bold tracking-wider'>Cost:</p>
                                <p>Free</p>
                            </div>
                            <div className='flex flex-row space-x-2 my-3'>
                                <p className='font-bold tracking-wider'>Limit:</p>
                                <p>1 / per person</p>
                            </div>
                        </div>
                        {account ?
                        <div className='flex flex-col'>
                            <div className='flex flex-row space-x-2 my-4 items-center'>
                                <p className='uppercase text-base font-bold text-gray-600'>Total Minted:</p>
                                <p className='text-2xl font-bold'><span>{badge?.nftCount}</span> / ∞</p>
                            </div>
                            <div className='flex items-center justify-center'>
                                {!badge?.userStatus ?
                                    <button onClick={handleMint} className='px-8 py-2 bg-gray-500 text-gray-200 font-bold text-2xl uppercase rounded-xl hover:scale-105'>Mint</button>
                                : 
                                <div><p>Already Minted!</p></div>
                                }
                            </div>
                        </div>
                        :
                        <AccountConnect /> 
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default MintNFT