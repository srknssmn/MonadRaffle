import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import BuySection from './BuySection';
import RefundSection from './RefundSection';
import checkCurrentRaffleStatus from '../../controllers/checkCurrentRaffleStatus';

function RaffleStatus({currentRaffle}) {

    const {currentRaffleSituation} = useSelector(state => state.raffles);
    const {checkRaffleStatus} = checkCurrentRaffleStatus();
    const [count, setCount] = useState(0)

    useEffect(() => {

        const timer = setTimeout(() => {
            const counter = count + 1;
            setCount(counter);
        }, 1000);
        
        const work = async () => {
            await checkRaffleStatus(currentRaffle?.raffleContract);
        };
        work();

        return () => clearTimeout(timer);
    }, [count]);

  return (
    <div>{currentRaffle?.raffleStatus && currentRaffleSituation ? <BuySection currentRaffle={currentRaffle}/> : <RefundSection currentRaffle={currentRaffle}/>}</div>
  )
}

export default RaffleStatus