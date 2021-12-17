require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
// require('hardhat-abi-exporter');
const { mnemonic, accounts, apiKey } = require('./secrets.json');

task("accounts", "Prints list of accounts", async() => {
  const accounts = await ethers.getSigners()
  for(const account of accounts) {
    console.log(account)
  }
})

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.2",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      // accounts: [`0x${privateKey}`],
      accounts: accounts
    },
    // ropsten: {
    //   url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    //   accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
    // },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic},
      apiKey: apiKey
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  etherscan: {
    apiKey: apiKey
  },
  // abiExporter: {
  //   path: './data/abi',
  //   clear: true,
  //   flat: true,
  //   only: [':ERC20$'],
  //   spacing: 2,
  //   pretty: true,
  // }
};
