import { Request, Response, Router } from "express";
import { Certification } from "../utils/types";
import { mapStructArrayToObjArray } from "../utils/utils";
import { readEventLogs } from "../utils/contractUtils";

const certificateCreatedEventDef =
  "event CertificateCreated(uint256 indexed certificateId, address certifier)";

class CertificationRoute {
  public router: Router = Router();
  private myCertificateContract: any;
  private myNFTFactoryContract: any;

  constructor(_myCertificateContract: any, _myNFTFactoryContract: any) {
    this.myCertificateContract = _myCertificateContract;
    this.myNFTFactoryContract = _myNFTFactoryContract;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getHandler);

    this.router.get(
      "/fetchCertifications/:address",
      async (req: Request, res: Response) => {
        const address = req.params.address;
        const result =
          await this.myCertificateContract.getCertificationsByCertifier(
            address
          );
        const finalResult = mapStructArrayToObjArray(result, [
          "certificateId",
          "certifier",
          "name",
          "description",
          "associateNFT",
          "requirements",
        ]);
        res.send(finalResult);
      }
    );

    this.router.post("/create", async (req: Request, res: Response) => {
      const certification: Certification = req.body;
      const associateNFTData = certification.associateNFT.split("-");
      certification.associateNFT = associateNFTData[1];
      const transactionData = await this.myCertificateContract.addCertificate(
        certification.certifier,
        certification.name,
        certification.description,
        certification.associateNFT,
        certification.requirements
      );
      if (
        certification.associateNFT !==
        "0x0000000000000000000000000000000000000000"
      ) {
        const eventLogs = await readEventLogs(certificateCreatedEventDef, transactionData.hash);

        await this.myNFTFactoryContract.updateNFTAssociateCertificate(
          certification.certifier,
          associateNFTData[0],
          true,
          eventLogs[0]?.certificateId
        );
      }
      res.status(200).send({ result: "success" });
    });
  }

  private getHandler(req: Request, res: Response) {
    res.send("Hello, World!");
  }
}

export default CertificationRoute;
