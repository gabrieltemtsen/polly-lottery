import {ethers} from 'ethers'
import axios from 'axios'
import { ref, computed } from 'vue'
import { createToast } from "mosha-vue-toastify";
import 'mosha-vue-toastify/dist/style.css';
import { acceptHMRUpdate, defineStore } from 'pinia'
import contractABI from '../abi.json'



const contractAddress = '0x0106661E592639EC7cbb6A3Fd7b27964695D1365'
const {ethereum} = window

export const useCryptoStore = defineStore('user', () => {
    const account = ref()
    const loading = ref(false)
    const lotteryPool = ref()
    const ticketCount = ref()
    const address = account.value;
    const nativeBalance = ref()
    const transactions = ref()
    const isOwner = ref();
    const isWinner = ref()



    
    
    // async function getNativeBalance(){
       
    //     try{
    //         const res = await axios.get(
    //             `http://localhost:3000/balance/${account.value}`,
    //             {
    //               headers: {
    //                 "Content-type": "application/json; charset=UTF-8",
    //                 },
    //             });
    //             if(res.statusText !== 'OK'){
    //              throw new Error(res.data.message)
    //             }
    //             nativeBalance.value = res.data 
    //             console.log(nativeBalance.value)                 
                
    //     } catch (error: any) {
    //         console.log(error)
            
    //     }
    // }

    async function getWalletTransactions() {
        const options = {
            method: 'GET',
            url: `https://deep-index.moralis.io/api/v2/${account.value}`,
            params: {chain: 'mumbai', limit: '6'},
            headers: {accept: 'application/json', 'X-API-Key': '0Fv7zoWhg4jIHO9b7AH63coTzFrOjCchggon6l9A1CJopxgWKlFwqRTDyFpQg8om'}
        };
          
          axios
            .request(options)
            .then(function (response) {
                transactions.value = response.data.result;
                console.log(response.data.result)
            })
            .catch(function (error) {
              console.error(error);
            });
    }

    async function getBalance() {
        setLoader(true)
        try{
            
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                const pollyLotteryContract = new ethers.Contract(contractAddress, contractABI, signer);

                const count =(await pollyLotteryContract.getBalance()) ;
                const amount = ethers.utils.formatEther(count);
                lotteryPool.value = amount;
                const check1 =(await pollyLotteryContract.isOwner(account.value)) ;
                isOwner.value = check1;
                const check2 =(await pollyLotteryContract.isWinner(account.value)) ;
                isWinner.value = check2;

                setLoader(false);

            }
        }
        catch(e) {
            setLoader(false)
            console.log('error', e)
        }
    }

    async function getPlayers() {
        setLoader(true)
        try{
            
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                const pollyLotteryContract = new ethers.Contract(contractAddress, contractABI, signer);

                const count =(await pollyLotteryContract.playerCount()) ;
                ticketCount.value = count;
                console.log('XX count', count);
                setLoader(false);

            }
        }
        catch(e) {
            setLoader(false)
            console.log('error', e)
        }
    }
    async function withdraw() {
        setLoader(true)
        try{
            
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                const pollyLotteryContract = new ethers.Contract(contractAddress, contractABI, signer);

                const withdraw =(await pollyLotteryContract.withdrawWinnings()) ;
                await withdraw.wait();
                setLoader(false);

            }
        }
        catch(e) {
            setLoader(false)
            console.log('error', e)
        }
    }

    async function pickWinner() {
        try {
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                const pollyLotteryContract = new ethers.Contract(contractAddress, contractABI, signer);

               
                const lotteryTxn = await pollyLotteryContract.pickWinner()
                console.log('processingg...', lotteryTxn.hash)
                await lotteryTxn.wait()

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
                const pollyLotteryContract = new ethers.Contract(contractAddress, contractABI, signer);
                const tx = {
                    value: ethers.utils.parseEther('0.05'),
                    gasLimit: 200000,

                }
                 createToast(
                    { title: "Pending", description: "transaction in progress..." },
                    {
                      transition: "slide",
                      type: "danger",
                      showIcon: true,
                      timeout: 18500,
                    }
                  );
                const lotteryTxn = await pollyLotteryContract.enterDraw(tx)
                console.log('processingg...', lotteryTxn.hash)
                await lotteryTxn.wait()
                createToast(
                    { title: "Success", description: "Bought Ticket!" },
                    {
                      transition: "slide",
                      type: "success",
                      showIcon: true,
                      timeout: 1500,
                    }
                  );
                console.log('sent--', lotteryTxn.hash)
                getBalance();
                getPlayers();
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
            createToast(
                { title: "Success", description: "Wallet Connected" },
                {
                  transition: "slide",
                  type: "success",
                  showIcon: true,
                  timeout: 2000,
                }
              );
            console.log('Connected: ', myAccounts[0])
            account.value = myAccounts[0]

            const options = {
                method: 'GET',
                url: `https://deep-index.moralis.io/api/v2/${account.value}/balance`,
                params: {chain: 'mumbai'},
                headers: {accept: 'application/json', 'X-API-Key': '0Fv7zoWhg4jIHO9b7AH63coTzFrOjCchggon6l9A1CJopxgWKlFwqRTDyFpQg8om'}
              };
              
              axios
                .request(options)
                .then(function (response) {
                  nativeBalance.value = ethers.utils.formatEther(response.data.balance);
                })
                .catch(function (error) {
                  console.error(error);
                });
            await getBalance();
            await getPlayers();
            await getWalletTransactions();
            
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
        enterDraw,
        pickWinner,
        withdraw,
        account,
        lotteryPool,
        ticketCount,
        nativeBalance,
        transactions,
        isOwner,
        isWinner
    }
}) 