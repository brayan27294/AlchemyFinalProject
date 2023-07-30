import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyCertificate test", function () {
  let signers: SignerWithAddress[];
  let myCertificateContract: any;

  before("deploy contract", async function () {
    // Contracts are deployed using the first signer/account by default
    signers = await ethers.getSigners();

    const MyCertificate = await ethers.getContractFactory("MyCertificate");
    myCertificateContract = await MyCertificate.deploy();
  });

  it("Should add two certificates", async function () {
    await myCertificateContract.addCertificate(
      signers[0].address,
      "Test 1",
      "This is the first certificate",
      "0x0000000000000000000000000000000000000000",
      ["Req 1", "Req 2"]
    );
    await myCertificateContract.addCertificate(
      signers[0].address,
      "Test 2",
      "This is the second certificate",
      "0x0000000000000000000000000000000000000000",
      ["Req 1", "Req 2", "Req 3"]
    );
    const certificates =
      await myCertificateContract.getCertificationsByCertifier(
        signers[0].address
      );
    expect(certificates.length).to.equal(2);
  });

  it("Should update the second certificate", async function () {
    await myCertificateContract.updateCertificate(
      1,
      signers[0].address,
      "Test 3",
      "This is the first certificate",
      signers[1].address,
      ["Req 1", "Req 2"]
    );
    const certificate =
      await myCertificateContract.getCertificationsByCertifierAndCertId(
        signers[0].address,
        1
      );
    expect(certificate.associateNFT).to.not.equal(
      "0x0000000000000000000000000000000000000000"
    );
    expect(certificate.associateNFT).to.equal(signers[1].address);
  });

  it("Shouldn't update the first certificate", async function () {
    const certificate =
      await myCertificateContract.getCertificationsByCertifierAndCertId(
        signers[0].address,
        0
      );
    expect(certificate.associateNFT).to.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });
});
