import { ethers } from "hardhat";

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
