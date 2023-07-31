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
      certificateId: generateRandomId(),
      name: `Certification Name ${i + 1}`,
      description: `Certification Description ${i + 1}`,
      associateNFT: "",
      requirements: [],
      certifier: address,
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

export const mapStructArrayToObjArray = (
  structArrayData: any[],
  structProperties: string[]
): any[] => {
  return structArrayData.map((structData) => {
    const structObject: any = {};
    structData.forEach((value: any, index: number) => {
      const propertyName = structProperties[index];
      if (typeof value === "object" && ethers.BigNumber.isBigNumber(value)) {
        structObject[propertyName] = value.toNumber();
      } else {
        structObject[propertyName] = value;
      }
    });
    return structObject;
  });
};
