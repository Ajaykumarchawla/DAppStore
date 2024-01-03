require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSingers();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: [
        "0x0c67ac3715ede9a1c5769b2a75359c9794813af5b68e6417bc6d39e34c4ea989",
      ],
    },
  },
};
