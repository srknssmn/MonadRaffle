import {ethers} from "ethers";
import { useDispatch } from 'react-redux';
import { setAccount } from '../store/slicers/accounts';
import {verifyNetwork} from "../controllers/verifyNetwork";

function useSetAccount() {

    const dispatch = useDispatch();

    const connectAccount = async () => {
        if(!window.ethereum) {
            throw Error("You have to use Metamask")
        } else {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            const account = await provider.send("eth_requestAccounts", [])
            const walletAddress = await account[0]

            await verifyNetwork();
            
            await dispatch(setAccount(walletAddress));

        }
    }
    return {connectAccount}
}

export default useSetAccount