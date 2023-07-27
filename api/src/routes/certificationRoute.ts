import { Request, Response, Router } from "express";
import { Certification } from "../utils/types";
import { generateRandomId, generatesCertifications } from "../utils/utils";

const certifications: Certification[] = [];

class CertificationRoute {
  public router: Router = Router();

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
      certifications.push({ ...certification, id: generateRandomId() });
      res.status(200).send({ result: "success" });
    });
  }

  private getHandler(req: Request, res: Response) {
    res.send("Hello, World!");
  }
}

export default CertificationRoute;
