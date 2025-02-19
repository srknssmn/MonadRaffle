import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import useSetUserNfts from '../../hooks/useSetUserNfts';
import { setMyNftsModal } from '../../store/slicers/myNftsModal';
import MyNft from '../MyNft';
import { IoMdClose } from "react-icons/io";

function MyNftsModal({updateNFT}) {
    const dispatch = useDispatch();
    const {account} = useSelector(state => state.accounts);
    const {myNftsModal} = useSelector(state => state.myNftsModal)
    const {userNfts} = useSelector(state => state.accounts);
    const {getUserNfts} = useSetUserNfts();

    const closeTokenModal = () => {
        dispatch(setMyNftsModal(false));
    }

    useEffect(() => {
        const work = async () => {
            getUserNfts(account);
        };
        work();
    }, [account]);

  return (
    <div className='w-full bg-opacity-50 bg-black fixed left-0 right-0 z-50 flex items-center justify-center'>
        <div className='bg-white px-4 rounded-xl w-2/3'>
            <div className='flex flex-row items-center justify-between pt-2'>
                <h1 className='font-bold text-2xl'></h1>
                <IoMdClose className='cursor-pointer' onClick={closeTokenModal} size={25}/>
            </div>
            <div className='w-full flex flex-wrap justify-center items-center overflow-y-auto h-120 overscroll-contain'>
            {userNfts.length > 0
                ? userNfts.map((item, i) => {
                    return (
                    <MyNft
                        key={i}
                        nftAddress={item.nftAddress}
                        nftId={item.nftId}
                        nftName={item.nftName}
                        nftURI={item.nftURI}
                        updateNFT={updateNFT}
                    />
                    );
                })
                : "Loading..."}
            </div>
        </div>
    </div>
  )
}

export default MyNftsModal