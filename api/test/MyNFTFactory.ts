import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyNFTFactory test", function () {
  let signers: SignerWithAddress[];
  let myNFTFactoryContract: any;

  before("deploy contract", async function () {
    // Contracts are deployed using the first signer/account by default
    signers = await ethers.getSigners();

    const MyNFTFactory = await ethers.getContractFactory("MyNFTFactory");
    myNFTFactoryContract = await MyNFTFactory.deploy();
  });

  it("Should deploy two NFTs for signer 1", async function () {
    await myNFTFactoryContract.deployNFT(
      signers[0].address,
      "Test Token",
      "TT",
      "testUri",
      [signers[0].address]
    );
    await myNFTFactoryContract.deployNFT(
      signers[0].address,
      "Test Token 2",
      "T2",
      "testUri 2",
      [signers[0].address]
    );
    const nftStructs = await myNFTFactoryContract.getNFTByOwner(
      signers[0].address
    );
    expect(nftStructs.length).to.equal(2);
  });

  it("Should mint the second NFT of signer 1 to signer 2", async function () {
    await myNFTFactoryContract.mintNFTtoNewOwner(
      signers[0].address,
      1,
      signers[1].address
    );
    const nftStructs = await myNFTFactoryContract.getNFTByOwner(
      signers[0].address
    );
    expect(nftStructs[1].associateAccounts[1]).to.equal(signers[1].address);
  });
});
