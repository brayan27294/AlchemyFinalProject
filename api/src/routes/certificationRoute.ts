import express, { Request, Response } from "express";
import { Certification } from "../utils/types";
import { generatesCertifications } from "../utils/utils";

const certifications: Certification[] = [];

class CertificationRoute {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getHandler);

    this.router.get(
      "/fetchCertifications/:address",
      (req: Request, res: Response) => {
        const address = req.params.address;
        const result = certifications.filter(
          (certification) => certification.address === address
        );
        if (result.length === 0) {
          const randomList = generatesCertifications(address);
          certifications.push(...randomList);
          result.push(...randomList);
        }
        res.send(result);
      }
    );

    this.router.post("/create", (req: Request, res: Response) => {
      const certification: Certification = req.body;
      const result = certifications.push(certification);
      res.status(result);
    });
  }

  private getHandler(req: Request, res: Response) {
    res.send("Hello, World!");
  }
}

export default CertificationRoute;
