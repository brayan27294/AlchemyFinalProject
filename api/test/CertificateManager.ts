import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CertificateManager test", function () {
  let signers: SignerWithAddress[];
  let certificateManagerContract: any;

  before("deploy contract", async function () {
    // Contracts are deployed using the first signer/account by default
    signers = await ethers.getSigners();

    const CertificateManager = await ethers.getContractFactory(
      "CertificateManager"
    );
    certificateManagerContract = await CertificateManager.deploy();
  });

  it("Should add three certificates", async function () {
    await certificateManagerContract.registerUser(
      signers[0].address,
      signers[1].address,
      0
    );
    await certificateManagerContract.registerUser(
      signers[0].address,
      signers[1].address,
      1
    );
    await certificateManagerContract.registerUser(
      signers[0].address,
      signers[2].address,
      1
    );
    const certificates =
      await certificateManagerContract.getCertificationsByIssuer(
        signers[0].address
      );
    expect(certificates.length).to.equal(3);
  });

  it("Should get two certificates from recipient one", async function () {
    const certificates =
      await certificateManagerContract.getCertificationsByUser(
        signers[1].address
      );
    expect(certificates.length).to.equal(2);
  });

  it("Should get one certificate from recipient two", async function () {
    const certificates =
      await certificateManagerContract.getCertificationsByUser(
        signers[2].address
      );
    expect(certificates.length).to.equal(1);
  });

  it("Should issue the second certificate of the recipient one", async function () {
    const unixTimestamp = Math.floor(Date.now() / 1000);
    await certificateManagerContract.issueCertificate(
      1,
      signers[1].address,
      unixTimestamp
    );
    const certificates =
      await certificateManagerContract.getCertificationsByUser(
        signers[1].address
      );
    expect(certificates[1].status).to.equal("Completed");
    expect(certificates[1].issueDate).to.equal(unixTimestamp);
  });

  it("Should invalidate the first certificate of the recipient one", async function () {
    await certificateManagerContract.invalidateCertificate(
      0,
      signers[1].address
    );
    const certificates =
      await certificateManagerContract.getCertificationsByUser(
        signers[1].address
      );
    expect(certificates[0].status).to.equal("Invalid");
    expect(certificates[0].isValid).to.equal(false);
  });
});
