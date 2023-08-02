import { Request, Response, Router } from "express";
import { mapStructArrayToObjArray } from "../utils/utils";
import { MyCertification } from "../utils/types";

class MyCertificationRoute {
  public router: Router = Router();
  private myCertificateContract: any;
  private myNFTFactoryContract: any;
  private certificateManagerContract: any;

  constructor(
    _myCertificateContract: any,
    _myNFTFactoryContract: any,
    _certificateManagerContract: any
  ) {
    this.myCertificateContract = _myCertificateContract;
    this.myNFTFactoryContract = _myNFTFactoryContract;
    this.certificateManagerContract = _certificateManagerContract;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getHandler);

    this.router.get(
      "/fetchCertifications/:address",
      async (req: Request, res: Response) => {
        const address = req.params.address;
        const result =
          await this.certificateManagerContract.getCertificationsByUser(
            address
          );
        const finalResult = mapStructArrayToObjArray(result, [
          "certificateId",
          "issuerCertificateId",
          "recipient",
          "issueDate",
          "issuer",
          "status",
          "isValid",
        ]);
        res.send(finalResult);
      }
    );

    this.router.post("/registerClient", async (req: Request, res: Response) => {
      const myCertification: MyCertification = req.body;
      await this.certificateManagerContract.registerUser(
        myCertification.issuer,
        myCertification.recipient,
        myCertification.issuerCertificateId
      );
      res.status(200).send({ result: "success" });
    });

    this.router.get(
      "/fetchIssuerCertifications/:address",
      async (req: Request, res: Response) => {
        const address = req.params.address;
        const result =
          await this.certificateManagerContract.getCertificationsByIssuer(
            address
          );
        const finalResult = mapStructArrayToObjArray(result, [
          "certificateId",
          "issuerCertificateId",
          "recipient",
          "issueDate",
          "issuer",
          "status",
          "isValid",
        ]);
        res.send(finalResult);
      }
    );

    this.router.post(
      "/issueCertification",
      async (req: Request, res: Response) => {
        const myCertification: MyCertification = req.body;
        const unixTimestamp = Math.floor(Date.now() / 1000);
        await this.certificateManagerContract.issueCertificate(
          myCertification.certificateId,
          myCertification.recipient,
          unixTimestamp
        );
        const certificate =
          await this.myCertificateContract.getCertificationsByCertifierAndCertId(
            myCertification.issuer,
            myCertification.issuerCertificateId
          );
        if (
          certificate.associateNFT !==
          "0x0000000000000000000000000000000000000000"
        ) {
          await this.myNFTFactoryContract.mintNFTtoNewOwner(
            myCertification.issuer,
            0, // certificate.associateNFT,
            myCertification.recipient
          );
        }
        res.status(200).send({ result: "success" });
      }
    );
  }

  private getHandler(req: Request, res: Response) {
    res.send("Hello, World!");
  }
}

export default MyCertificationRoute;
