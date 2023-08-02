import { ethers } from "hardhat";

const getSigners = () => ethers.getSigners();

const getContractFactory = async (contractName: string) => {
  return await ethers.getContractFactory(contractName);
};

export const createNFT = async (
  name: String,
  symbol: String,
  nftUrl: String
) => {
  const signers = await getSigners();
  const MyNFT = await getContractFactory("MyNFT");
  const myNFTContract = await MyNFT.deploy(name, symbol);
  await myNFTContract.safeMint(signers[0].address, nftUrl);
  return myNFTContract;
};

export const deployMyCertificateContract = async () => {
  const network = await ethers.getDefaultProvider().getNetwork();
  console.log("Network name=", network.name);
  console.log("Network chain id=", network.chainId);
  const MyCertificate = await getContractFactory("MyCertificate");
  return MyCertificate.deploy();
};

export const deployMyNFTFactoryContract = async () => {
  const MyNFTFactory = await getContractFactory("MyNFTFactory");
  return MyNFTFactory.deploy();
};

export const deployCertificateManagerContract = async () => {
  const CertificateManager = await getContractFactory("CertificateManager");
  return CertificateManager.deploy();
};

export const readEventLogs = async (
  eventDef: string,
  transactionHash: string
) => {
  const receipt = await ethers.provider.getTransactionReceipt(transactionHash);
  const iface = new ethers.utils.Interface([eventDef]);
  return receipt.logs.map((log) => {
    const event = iface.parseLog(log);
    return event ? event.args : null;
  });
};
