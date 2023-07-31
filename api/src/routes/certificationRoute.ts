import { Request, Response, Router } from "express";
import { Certification } from "../utils/types";
import { mapStructArrayToObjArray } from "../utils/utils";

class CertificationRoute {
  public router: Router = Router();
  private myCertificateContract: any;

  constructor(_myCertificateContract: any) {
    this.myCertificateContract = _myCertificateContract;
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
      await this.myCertificateContract.addCertificate(
        certification.certifier,
        certification.name,
        certification.description,
        certification.associateNFT,
        certification.requirements
      );
      res.status(200).send({ result: "success" });
    });
  }

  private getHandler(req: Request, res: Response) {
    res.send("Hello, World!");
  }
}

export default CertificationRoute;
