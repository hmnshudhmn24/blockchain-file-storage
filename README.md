# Blockchain-Based File Storage

This project is a decentralized file storage system using Ethereum and IPFS, offering a secure alternative to cloud storage solutions.

## Features
- Store files in a decentralized manner using IPFS.
- Save file metadata (hash, name, timestamp) on the Ethereum blockchain.
- User-friendly React-based frontend.

## Setup Instructions

### 1. Install Dependencies
```sh
npm install
```

### 2. Compile & Deploy the Smart Contract
```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Start Backend
```sh
cd backend
node server.js
```

### 4. Start React Frontend
```sh
cd frontend
npm start
```

## Requirements
- Node.js & npm
- Hardhat
- MetaMask Wallet
- React.js
- Express.js
- IPFS (Infura or local node)
