import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { ethers } from "hardhat";
import CertificationRoute from "./routes/certificationRoute";
import NFTRoute from "./routes/nftsRoute";
import {
  deployCertificateManagerContract,
  deployMyCertificateContract,
  deployMyNFTFactoryContract,
} from "./utils/contractUtils";
import MyCertificationRoute from "./routes/myCertificationRoute";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initApp = async () => {
  //Deploy My Certificate and Certificate Manager Smart Contracts
  const myCertificateContract = await deployMyCertificateContract();
  const myNFTFactoryContract = await deployMyNFTFactoryContract();
  const certificateManagerContract = await deployCertificateManagerContract();

  const certificationRoute = new CertificationRoute(
    myCertificateContract,
    myNFTFactoryContract
  );
  const nftRoute = new NFTRoute(myNFTFactoryContract);

  const myCertificationManagerRoute = new MyCertificationRoute(
    myCertificateContract,
    myNFTFactoryContract,
    certificateManagerContract
  );

  app.use("/", (req: Request, res: Response) => {
    res.send("Hello from API");
  });
  app.use("/certification", certificationRoute.router);
  app.use("/nft", nftRoute.router);
  app.use("/myCertification", myCertificationManagerRoute.router);

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

initApp();
