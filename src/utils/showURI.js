import {ethers} from "ethers";
import { verifyNetwork } from "../controllers/verifyNetwork";
import { ERC721_ABI } from "../constants/abi";

function showURI() {

    const showTokenURI = async(address, nftID) => {
        
        verifyNetwork();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(address, ERC721_ABI, provider);
        
        let tokenURI = await contract.tokenURI(nftID)
        console.log(contract)
        console.log("tokenURI:", tokenURI)
        let image;

        if (tokenURI.startsWith("data:")) {
            // Base64 işlemleri
            const base64Data = tokenURI.split(',')[1];
            const jsonString = atob(base64Data);
            const jsonData = JSON.parse(jsonString);
            let imageURI = jsonData.image;
            image = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
        } else if (tokenURI.startsWith("ipfs://")) {
            // IPFS işlemleri
            let replacetURI = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            image = replacetURI.slice(replacetURI.indexOf("https"), replacetURI.lastIndexOf("/"));
        } else {
            throw new Error("Unsupported response format");
        }
        // console.log("tokenURI: ",tokenURI)
        // let replacetURI = await tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
        // let imgUrl = await replacetURI?.slice(replacetURI.indexOf("https"),replacetURI?.lastIndexOf("/"))
        await console.log(image)
        
        return image;
    }

    return {showTokenURI}
}

export default showURI