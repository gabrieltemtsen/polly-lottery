# Polly-lottery 

**NOTE**: You may need a Metamask or Core Wallet enabled to test on devevlopment environment.

## Summary
Polly-Lottery is a decentralised application where users can play and win win lotteries on the polygon mumbai testnet.

## Requirements
1. [Vscode] or any IDE of your choice.
2. [Node.js] version 16 or higher.
3. [Google-Chrome]-[Metamask] / [Core].
4. [HardHat].
5. [Typescript].

#Environmental variables
create a .env file then add your private key [PRIVATE_KEY for contract interaction

## Quick start
1. Clone the repository.
2. cd into the repository.
3. run:  npm install.
4. run: npm run dev.

**Live Demo** : https://polly-lottery.netlify.app/

## How to deploy the Smart Contract on the mumbai Testnet
1. cd into the project directory.
2. confirm you have added your private key to the env file
3. run: npx hardhat compile (to compile the smart contract);
5. run: npx hardhat run scripts/deploy.js --network mumbai;
6. copy your new smart contract address then add it to the client application in /src/store/crypto.ts.

refer to 'https://youtu.be/Sp4viK2UsuE' for guidance.


