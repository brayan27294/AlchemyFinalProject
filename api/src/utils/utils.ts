import { ethers } from "hardhat";
import { Certification } from "./types";

const generateRandomNumber = () => {
  const randomDecimal = Math.random();
  const randomNumber = randomDecimal * (5 - 2) + 2;
  const roundedNumber = Math.round(randomNumber);
  return roundedNumber;
};

export const generatesCertifications = (address: string) => {
  const certifications = [];
  for (let i = 0; i < 5; i++) {
    const counter = generateRandomNumber();
    const certification: Certification = {
      id: generateRandomId(),
      name: `Certification Name ${i + 1}`,
      description: `Certification Description ${i + 1}`,
      nftUrl: "",
      requirements: [],
      address,
    };
    let initial = 0;
    while (initial <= counter) {
      certification.requirements.push(`Requirement ${initial + 1}`);
      initial++;
    }
    certifications.push(certification);
  }
  return certifications;
};

export const generateRandomId = (): string => {
  const randomBytes = ethers.utils.randomBytes(32);
  const id = ethers.utils.hexlify(randomBytes);
  return id;
};
