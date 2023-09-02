import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: `${process.env.SEPOLIA_URL}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};

export default config;
