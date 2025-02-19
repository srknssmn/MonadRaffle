import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import TxhModal from '../components/Models/TxhModal';
import { Link } from 'react-router-dom';
import AccountConnect from '../components/AccountConnect';
import useSetUserPortfolio from '../hooks/useSetUserPortfolio';
import LatestRaffle from '../components/RaffleComponents/LatestRaffle';
import NewRaffle from '../components/RaffleComponents/NewRaffle';
import LiveRaffle from '../components/RaffleComponents/LiveRaffle';
import PastRaffle from '../components/RaffleComponents/PastRaffle';

function Dashboard() {

  const {account} = useSelector(state => state.accounts);
  const {userPortfolio} = useSelector(state => state.accounts);
  const {txModal} = useSelector(state => state.txModal)

  const {getUserRaffles} = useSetUserPortfolio();

  const [first, setfirst] = useState("ONLINE")

  useEffect(() => {
    const work = async () => {
      getUserRaffles(account);
    };
    work();
  }, [account]);

  return (
    
    <>
    {txModal && <TxhModal />}
    <div className='px-30	my-10'>
      <div className='flex flex-col'>
        <h1 className='text-4xl font-semibold mb-10 uppercase'>Portfolio</h1>
      </div>
      {account ?

        <div className='flex flex-col space-y-4'>
          <div className='flex flex-row bg-gray-200 py-8 px-8 rounded-xl'>
            <div className='w-3/6 flex flex-col'>
              <p className='uppercase font-bold text-sm text-gray-600'>Wallet Address</p>
              <p>{account}</p>
            </div>
            <div className='w-2/6 flex flex-col'>
              <p className='uppercase font-bold text-sm text-gray-600'>Raffles Created</p>
              <p>{userPortfolio.length}</p>
            </div>
            <div className='w-1/6'>
              <Link to={"/create"} className='py-2 px-4 bg-gray-800 text-gray-200 rounded-xl hover:scale-90 transition duration-700'>Create New Raffle</Link>
            </div>
          </div>
          <div className='mt-10 bg-gray-200 py-8 px-8 rounded-xl'>
            <h1 className='text-2xl font-semibold mb-10 uppercase'>My Raffles</h1>
            <div className='w-full select-none mt-10 flex flex-row bg-white space-x-4 items-center justify-center py-4 font-bold tracking-wider'>
                {first === "ONLINE" ? <button className='text-blue-800 font-bold text-xl' onClick={() => {setfirst("ONLINE")}}>LIVE</button> : <button onClick={() => {setfirst("ONLINE")}}>LIVE</button>}
                {first === "OFFLINE" ? <button className='text-blue-800 font-bold text-xl' onClick={() => {setfirst("OFFLINE")}}>PAST</button> : <button onClick={() => {setfirst("OFFLINE")}}>PAST</button>}
                {first === "NEW" ? <button className='text-blue-800 font-bold text-xl' onClick={() => {setfirst("NEW")}}>NEW</button> : <button className='text-gray-400 font-bold' onClick={() => {setfirst("NEW")}}>NEW</button>}
            </div>
            {
                (() => {
                    if (first == "ONLINE") {
                        return (
                          <div className='flex flex-col space-y-2 mt-4'>
                            <p className='items-center justify-center text-center uppercase font-bold text-sm'>User-created <span className='text-blue-600'>online</span> raffles.</p>
                            <div className='w-full flex flex-wrap justify-center items-center'>
                            {userPortfolio.length > 0
                                ? userPortfolio.filter((data) => (data[6] === true)).map((item, i) => {
                                    return (
                                    <LiveRaffle
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
                          </div>  
                        )
                    } else if (first == "OFFLINE") {
                        return (
                          <div className='flex flex-col space-y-2 mt-4'>
                            <p className='items-center justify-center text-center uppercase font-bold text-sm'>User-created <span className='text-blue-600'>offline</span> raffles.</p>
                            <div className='w-full flex flex-wrap justify-center items-center'>
                            {userPortfolio.length > 0
                                ? userPortfolio.filter((data) => (data[6] === false && data[8] === true)).map((item, i) => {
                                    return (
                                    <PastRaffle
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
                          </div>  
                        )
                    } else if (first == "NEW") {
                      return (
                        <div className='flex flex-col mt-4'>
                          <p className='items-center justify-center text-center uppercase font-bold text-sm'>It is currently produced and waiting for action.</p>
                          <p className='items-center justify-center text-center uppercase font-bold text-sm text-blue-600'>Start the raffle for people to buy tickets.</p>
                          <div className='w-full flex flex-wrap justify-center items-center'>
                          {userPortfolio.length > 0
                              ? userPortfolio.filter((data) => (data[6] === false && data[8] === false)).map((item, i) => {
                                  return (
                                  <NewRaffle
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
                        </div>  
                      )
                  }
                  })()
                }
          </div>
        </div>
       :
        <AccountConnect />
      }
    </div>
    </>
    
  )
}

export default Dashboard