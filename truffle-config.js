require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*" // Match any network id
      },
      testnet: {
        provider: () =>
          new HDWalletProvider(
            PRIVATE_KEY,
            `https://rpc.testnet.fantom.network`
          ),
        network_id: 4002,
      },
      mainnet: {
        provider: () =>
          new HDWalletProvider(
            PRIVATE_KEY,
            `https://rpcapi.fantom.network`
          ),
        network_id: 250,
      },
    },
    compilers: {
      solc: {
        version: "0.8.17",
        settings: {          // See the solidity docs for advice about optimization and evmVersion
          optimizer: {
          enabled: false,
          runs: 200
          },
        },
      },
    }
  };