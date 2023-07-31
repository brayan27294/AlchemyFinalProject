import { Request, Response, Router } from "express";
import { mapStructArrayToObjArray } from "../utils/utils";
import { MyCertification } from "../utils/types";

class MyCertificationRoute {
  public router: Router = Router();
  private certificateManagerContract: any;

  constructor(_certificateManagerContract: any) {
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
  }

  private getHandler(req: Request, res: Response) {
    res.send("Hello, World!");
  }
}

export default MyCertificationRoute;
