import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ethers } from "hardhat";
import CertificationRoute from "./routes/certificationRoute";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const signers = await ethers.getSigners();
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFTContract = await MyNFT.deploy("Test Token", "TT");
  await myNFTContract.safeMint(signers[0].address, "testUri");
  res.send(await myNFTContract.tokenURI(0));
});

// Initialize your route class
const certificationRoute = new CertificationRoute();

app.use("/certification", certificationRoute.router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
