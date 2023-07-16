import Web3 from "web3";

export const connectToWallet = async () => {
  await window.ethereum.enable();
  return new Web3(window.ethereum);
};

export const getAccounts = async (web3: Web3) => {
  return await web3.eth.getAccounts();
};
