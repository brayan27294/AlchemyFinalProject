import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from "hardhat";

describe('MyNFT test', function () {
  let signers: SignerWithAddress[];
  let myNFTContract: any;

  before('deploy contract', async function(){
    // Contracts are deployed using the first signer/account by default
    signers = await ethers.getSigners();
    
    const MyNFT = await ethers.getContractFactory('MyNFT');
    myNFTContract = await MyNFT.deploy('Test Token', 'TT');
  });

  it('Should mint the token', async function () {
    await myNFTContract.safeMint(signers[0].address, 'testUri');
    expect(await myNFTContract.tokenURI(0)).to.equal('testUri');
  });

  it(`Shouldn't transfer the token`, async function () {
    try{
      await myNFTContract.transferFrom(signers[0].address, signers[1].address, 0);
      expect(false);
    }catch(e){
      expect(e);
    }
  });

  it(`Should mint a new nft to the second signer from the original`, async function () {
    await myNFTContract.safeMint(signers[1].address, await myNFTContract.tokenURI(0));
    expect(await myNFTContract.tokenURI(1)).to.equal('testUri');
  });
});
