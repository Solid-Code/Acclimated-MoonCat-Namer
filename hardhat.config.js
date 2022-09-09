/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-waffle");

const { API_URL } = process.env

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: API_URL,
        blockNumber: 15499650
      },
      gas: 2500000,
},
    local: {
      url: "http://127.0.0.1:8545",
      forking: {
        url: API_URL,
        blockNumber: 15499650
      },
      gas: 2500000,
    },
    docker: {
      url: "http://hardhat-node:8545"
    }
  },
  solidity: {
    version: "0.8.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 60000,
    slow: 50000
  }
}
