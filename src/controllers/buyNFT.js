import React from 'react';
import { useSelector, useDispatch} from "react-redux";
import { toast } from 'react-toastify';
import useSetAccount from '../hooks/useSetAccount';
import { useRaffleContract } from '../contracts/raffleContract';
import useSetRaffle from '../hooks/useSetRaffle';
import { setTxModal } from '../store/slicers/txModal';
import parseEthers from '../utils/parseEthers';
import adjustEthersNumber from '../utils/adjustEthersNumber';

function buyNFT() {
    const dispatch = useDispatch();
    const {account} = useSelector(state => state.accounts)
    const {connectAccount} = useSetAccount();
    const {parseEthersValue} = parseEthers();
    const {adjustNumber} = adjustEthersNumber();
    const {getRaffle} = useSetRaffle();

    async function buyTicket(raffleAddress, numberOfTickets) {

        if(!account) {
            await connectAccount();
        }

        try {
            
            const contract = await useRaffleContract(raffleAddress);
            const nftInfo = await contract.getPoolInfo();

            const ticketCost = await (adjustNumber(nftInfo[2]))
            const numberTicketCost = await Number(ticketCost)
            const payValue = await (numberOfTickets * numberTicketCost).toFixed(6);
            const parsedPayValue = await parseEthersValue(payValue)
            
            const txh = await contract.buyTicket(numberOfTickets, {value: parsedPayValue});
            await dispatch(setTxModal({open: true, type: 3}));
            await txh.wait();
            await dispatch(setTxModal(false));
            const hash = await txh.hash
            console.log(hash)

            toast("Successfully buyed", {
                position: "top-right",
                autoClose: 5000
            });

            await dispatch(getRaffle(raffleAddress));

        } catch (error) {
            console.log(error)
            await dispatch(setTxModal(false));
            console.log("Error:", error)
            toast(error.reason, {
                position: "top-right",
                autoClose: 5000
            });
        }


    }
    return {buyTicket};
}

export default buyNFT