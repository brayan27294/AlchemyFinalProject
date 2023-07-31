import { Request, Response, Router } from "express";
import { NFT } from "../utils/types";
import { generateRandomId, mapStructArrayToObjArray } from "../utils/utils";
import { createNFT } from "../utils/contractUtils";

export const nftList: NFT[] = [];

class NFTRoute {
  public router: Router = Router();
  private myNFTFactoryContract: any;

  constructor(_myNFTFactoryContract: any) {
    this.myNFTFactoryContract = _myNFTFactoryContract;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/fetchNft/:id", (req: Request, res: Response) => {
      const id = req.params.id;
      const result = nftList.find((nft) => nft.nftId === id);
      res.send(result);
    });

    this.router.get(
      "/fetchNfts/:address",
      async (req: Request, res: Response) => {
        const address = req.params.address;
        const result = await this.myNFTFactoryContract.getNFTByOwner(address);
        const finalResult = mapStructArrayToObjArray(result, [
          "nftId",
          "nftAddress",
          "nftOwner",
          "name",
          "symbol",
          "nftUrl",
          "associateAccounts",
        ]);
        res.send(finalResult);
      }
    );

    this.router.get(
      "/fetchAvailableNfts/:address",
      async (req: Request, res: Response) => {
        const address = req.params.address;
        const result = await this.myNFTFactoryContract.getNFTByOwner(address);
        const finalResult = mapStructArrayToObjArray(result, [
          "nftId",
          "nftAddress",
          "nftOwner",
          "name",
          "symbol",
          "nftUrl",
          "associateAccounts",
        ]);
        res.send(finalResult);
      }
    );

    this.router.post("/create", async (req: Request, res: Response) => {
      const newNft: NFT = req.body;
      await this.myNFTFactoryContract.deployNFT(
        newNft.nftOwnerAddress,
        newNft.name,
        newNft.symbol,
        newNft.nftUrl,
        [newNft.nftOwnerAddress]
      );
      res.status(200).send({ result: "success" });
    });
  }
}

export default NFTRoute;
