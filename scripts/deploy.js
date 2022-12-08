const hre = require('hardhat')

async function main(){
    const [deployer]= await hre.ethers.getSigners()

    console.log('Deploying contracts with account: ', deployer.address,)
    const PollyLottery = await hre.ethers.getContractFactory('PollyLottery')
    const lottery = await PollyLottery.deploy();
    await lottery.deployed();
    console.log('PollyLottery deployed to : ', lottery.address)

}

main().then(() => process.exit(0)).catch((error)=>{
    console.error(error)
    process.exit(1)
} )