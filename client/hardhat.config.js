/* eslint-disable no-undef */
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: API_URL, 
      accounts: [PRIVATE_KEY], 
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
