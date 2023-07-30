import { Request, Response, Router } from "express";
import { NFT } from "../utils/types";
import { generateRandomId } from "../utils/utils";
import { createNFT } from "../utils/nftUtils";

export const nftList: NFT[] = [];

class NFTRoute {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/fetchNft/:id", (req: Request, res: Response) => {
      const id = req.params.id;
      const result = nftList.find((nft) => nft.id === id);
      res.send(result);
    });

    this.router.get("/fetchNfts/:address", (req: Request, res: Response) => {
      const address = req.params.address;
      const result = nftList.filter((nft) => nft.ownerAddress === address);
      res.send(result);
    });

    this.router.get(
      "/fetchAvailableNfts/:address",
      (req: Request, res: Response) => {
        const address = req.params.address;
        const result = nftList.filter(
          (nft) => nft.ownerAddress === address && !nft.certificationID
        );
        res.send(result);
      }
    );

    this.router.post("/create", async (req: Request, res: Response) => {
      const newNft: NFT = req.body;
      const myNFTContract = await createNFT(
        newNft.name,
        newNft.symbol,
        newNft.nftUrl
      );
      nftList.push({
        ...newNft,
        id: generateRandomId(),
        nftAddress: myNFTContract.address,
      });
      res.status(200).send({ result: "success" });
    });
  }
}

export default NFTRoute;
