export const verifyNetwork = async () => {

    // Sepolia Network Verifying
    const monadID = await '0x279F';
    const chainId = await window.ethereum.request({
        method: 'eth_chainId',
    });
    
    if (chainId === monadID){
        console.log("Bravo!, you are on the correct network")
        
    } else {
  
        console.log("oulalal, switch to the Monad Testnet");
        
        try {
        
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: monadID}],
            });
            console.log("You have succefully switched to Story Odyssey Testnet")
        
        } catch (switchError) {
            
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                console.log("This network is not available in your metamask, please add it")

                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                        { chainId: '0x279F', 
                        chainName:'Monad Testnet',
                        rpcUrls:['http://monad-testnet.drpc.org'],
                        blockExplorerUrls:['https://testnet.monadexplorer.com/'],
                        nativeCurrency: {
                        symbol:'MON', // 2-6 characters long
                    decimals: 18
                    }
                        
                        }],
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
};