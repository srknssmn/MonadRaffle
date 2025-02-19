import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import AccountConnect from '../components/AccountConnect';
import useSetCollectionRaffles from '../hooks/useSetCollectionRaffles';
import LatestRaffle from '../components/RaffleComponents/LatestRaffle';

function Collection() {
    const {account} = useSelector(state => state.accounts);
    const { nftContract } = useParams();

    const {getCollectionRaffles} = useSetCollectionRaffles();
    const {currentCollectionRaffles} = useSelector(state => state.collections)

    const [first, setfirst] = useState("ONLINE")
    
    useEffect(() => {
        const work = async () => {
          getCollectionRaffles(nftContract);
        };
        work();
    }, []);

  return (
    <>
    <div>
        {account ?

        <div className='w-full flex flex-col my-10'>
            <div className='flex flex-col space-y-2 mb-3 border-b-2 border-gray-200 pb-4'>
                <div className='flex flex-row items-center space-x-2 justify-center'>
                    <p className='text-gray-500 text-sm uppercase font-bold'>Collection Contract: </p>
                    <p className=''>{nftContract}</p>
                </div>
                <div className='select-none flex flex-row bg-white space-x-4 items-center justify-center py-4 font-bold tracking-wider'>
                    {first === "ONLINE" ? <button className='text-blue-800 font-bold text-xl' onClick={() => {setfirst("ONLINE")}}>LIVE</button> : <button onClick={() => {setfirst("ONLINE")}}>LIVE</button>}
                    {first === "OFFLINE" ? <button className='text-blue-800 font-bold text-xl' onClick={() => {setfirst("OFFLINE")}}>PAST</button> : <button onClick={() => {setfirst("OFFLINE")}}>PAST</button>}
                </div>
            </div>

            {
            (() => {
                if (first == "ONLINE") {
                    return (
                        <div className='w-full flex flex-wrap justify-center items-center'>
                        {currentCollectionRaffles.length > 0
                            ? currentCollectionRaffles.filter((data) => (data[6] === true)).map((item, i) => {
                                return (
                                <LatestRaffle
                                    key={i}
                                    raffleAddress={item[0]}
                                    nftAddress={item[1]}
                                    nftId={item[2]}
                                    ticketCost={item[3]}
                                    maxTicket={item[4]}
                                    currentTicket={item[5]}
                                    raffleStatus={item[6]}
                                    lotteryAccomplished={item[8]}
                                    nftName={item[7]}
                                    nftURI={item[9]}
                                />
                                );
                            })
                            : "Loading..."}
                        </div>
                    )
                } else if (first == "OFFLINE") {
                    return (
                        <div className='w-full flex flex-wrap justify-center items-center'>
                        {currentCollectionRaffles.length > 0
                            ? currentCollectionRaffles.filter((data) => (data[6] === false && data[8] === true)).map((item, i) => {
                                return (
                                <LatestRaffle
                                    key={i}
                                    raffleAddress={item[0]}
                                    nftAddress={item[1]}
                                    nftId={item[2]}
                                    ticketCost={item[3]}
                                    maxTicket={item[4]}
                                    currentTicket={item[5]}
                                    raffleStatus={item[6]}
                                    lotteryAccomplished={item[8]}
                                    nftName={item[7]}
                                    nftURI={item[9]}
                                />
                                );
                            })
                            : "Loading..."}
                        </div>
                    )
                }})()
            }
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

export default Collection