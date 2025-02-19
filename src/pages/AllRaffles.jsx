import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import AccountConnect from '../components/AccountConnect';
import useSetAllRaffles from '../hooks/useSetAllRaffles';
import LatestRaffle from '../components/RaffleComponents/LatestRaffle';

function AllRaffles() {
    const {account} = useSelector(state => state.accounts);
    const {getAllRaffles} = useSetAllRaffles();
    const {raffles} = useSelector(state => state.raffles)

    const [first, setfirst] = useState("ONLINE")

    useEffect(() => {
        const work = async () => {
            getAllRaffles();
        };
        work();
    }, []);


  return (
        
    <div className='w-full flex flex-col my-10'>
            <div className='flex flex-row items-center space-x-2 justify-center'>
                <h1 className='text-6xl font-bold uppercase'>All Raffles</h1>
            </div>
            {account ?
            <div className='flex flex-col items-center justify-center w-full'>
                <div className='w-full select-none mt-10 flex flex-row bg-white space-x-4 items-center justify-center py-4 font-bold tracking-wider'>
                    {first === "ONLINE" ? <button className='text-blue-800 font-bold text-xl' onClick={() => {setfirst("ONLINE")}}>LIVE</button> : <button onClick={() => {setfirst("ONLINE")}}>LIVE</button>}
                    {first === "OFFLINE" ? <button className='text-blue-800 font-bold text-xl' onClick={() => {setfirst("OFFLINE")}}>PAST</button> : <button onClick={() => {setfirst("OFFLINE")}}>PAST</button>}
                </div>
                {
                (() => {
                    if (first == "ONLINE") {
                        return (
                            <div className='w-full flex flex-wrap justify-center items-center'>
                            {raffles.length > 0
                                ? raffles.filter((data) => (data[6] === true)).map((item, i) => {
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
                            {raffles.length > 0
                                ? raffles.filter((data) => (data[6] === false && data[8] === true)).map((item, i) => {
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
            </div>}
    </div>

  )
}

export default AllRaffles