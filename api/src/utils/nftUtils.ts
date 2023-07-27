import { ethers } from "hardhat";

const getSigners = () => ethers.getSigners();

export const createNFT = async (
  name: String,
  symbol: String,
  nftUrl: String
) => {
  const signers = await getSigners();
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFTContract = await MyNFT.deploy(name, symbol);
  await myNFTContract.safeMint(signers[0].address, nftUrl);
  return myNFTContract;
};
