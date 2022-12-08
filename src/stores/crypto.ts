import {ethers} from 'ethers'
import { ref, computed } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import contractABI from '../artifacts/contracts/PollyLottery.sol/PollyLottery.json'

const contractAddress = '0x762571cfF94F44E83CaefBca68fd07D5638242E3'
const {ethereum} = window
export const useCryptoStore = defineStore('user', () => {
    const account = ref(null)
    const loading = ref(false)
    const lotteryPool = ref()

    async function getBalance() {
        setLoader(true)
        try{
            
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                const pollyLotteryContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

                const count =(await pollyLotteryContract.getBalance()) ;
                const amount = ethers.utils.formatEther(count);
                lotteryPool.value = amount;
                console.log('XX count', amount);
                setLoader(false);

            }
        }
        catch(e) {
            setLoader(false)
            console.log('error', e)
        }
    }

    async function setDraw(ticketPrice: number) {
        console.log('settingLOadr')
        setLoader(true)
        try {
            console.log('got', ticketPrice)
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                const pollyLotteryContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

               
                const lotteryTxn = await pollyLotteryContract.setDraw(ticketPrice)
                console.log('processingg...', lotteryTxn.hash)
                await lotteryTxn.wait()
                console.log('sent--', lotteryTxn.hash)

                const count =(await pollyLotteryContract.ticketPrice()) ;
                const amount = ethers.utils.formatEther(count)
                console.log('XX count', amount);
                setLoader(false);

            } else {
                console.log("ETH doesnt Exist!")
            }
        }
        catch(e) {
            setLoader(false)
            console.log('error', e)
        }
    }
    async function enterDraw() {
        console.log('settingLOadr')
        setLoader(true)
        try {
            
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                const pollyLotteryContract = new ethers.Contract(contractAddress, contractABI.abi, signer);
                const tx = {
                    value: ethers.utils.parseEther('0.05'),
                    gasLimit: 200000,

                }
                const lotteryTxn = await pollyLotteryContract.enter(tx)
                console.log('processingg...', lotteryTxn.hash)
                await lotteryTxn.wait()
                console.log('sent--', lotteryTxn.hash)
                getBalance();
                setLoader(false);

            } else {
                console.log("ETH doesnt Exist!")
            }
        }
        catch(e) {
            setLoader(false)
            console.log('error', e)
        }
    }
    async function connectWallet() {
        try {
            if(!ethereum) {
                alert('please connect your wallet')
            }
            const myAccounts = await ethereum.request({method: 'eth_requestAccounts'})
            console.log('Connected: ', myAccounts[0])
            account.value = myAccounts[0]
            await getBalance();
            
        }catch (e) {
            console.log(e)
        }
    } 
    function setLoader(value: boolean) {
        console.log('setloader', value)
        loading.value = value;
    }
    return {
        setLoader,
        loading,
        connectWallet,
        setDraw,
        enterDraw,
        account,
        lotteryPool
    }
}) 