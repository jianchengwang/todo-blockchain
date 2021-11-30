require("@nomiclabs/hardhat-waffle");

const { accounts, BSCPRIVATE_ACCOUNTS } = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.6",
  networks: {
    hardhat: {
      chainId: 31337
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      // accounts: [`0x${privateKey}`],
      accounts: accounts
    },
    bscprivate: {
      url: "http://nps.shang-chain.com:18028",
      chainId: 1024,
      accounts: BSCPRIVATE_ACCOUNTS
    },
  }
};
