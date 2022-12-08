/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config()
require('@nomiclabs/hardhat-waffle')
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/j4BnDKiIWoah_iOOeKsdePQ97ZEQhKSZ',
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
  },
};
