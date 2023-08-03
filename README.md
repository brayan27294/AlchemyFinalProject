# AlchemyFinalProject

This is a Certification Dapp. This application aims to set up two basic roles (certifier and client).

The certifier can create new certificates and associate NFT with each certificate.

The client can see what are the available certifications from different certifiers. Select the certification that the client wants to start
and then if the certification contains a NFT the client will receive this NFT.

## Project Layout

There are two top-level folders:

1. `/ui` - contains the front-end application
2. `/api` - contains the back-end application

The API folder contains the smart contracts and the hardhat logic:

1. `/contracts` - contains the solidity contract
2. `/src` - contains the source code
3. `/tests` - contains tests for the solidity contract

## Setup

First, you need to compile the contracts using `npm run hardhat-compile`. 

## Back-End

`cd` into the `/api` directory and run `npm install`

Compile the contracts using `npm run hardhat-compile`

To run the back-end application run `npm start`. Open [http://localhost:3001](http://localhost:3001) to view it in your browser.


## Front-End

`cd` into the `/ui` directory and run `npm install`

To run the front-end application run `npm start`. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
