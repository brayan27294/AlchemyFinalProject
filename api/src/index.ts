import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { ethers } from "hardhat";
import CertificationRoute from "./routes/certificationRoute";
import NFTRoute from "./routes/nftsRoute";
import {
  deployCertificateManagerContract,
  deployMyCertificateContract,
} from "./utils/contractUtils";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initApp = async () => {
  //Deploy My Certificate and Certificate Manager Smart Contracts
  const myCertificateContract = await deployMyCertificateContract();
  const certificateManagerContract = await deployCertificateManagerContract();

  const certificationRoute = new CertificationRoute(myCertificateContract);
  const nftRoute = new NFTRoute();

  app.use("/certification", certificationRoute.router);
  app.use("/nft", nftRoute.router);

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

initApp();
