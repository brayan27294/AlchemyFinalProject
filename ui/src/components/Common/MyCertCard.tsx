import React from "react";
import { MyCertification } from "../../utils/types";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IMyCertCardProps {
  myCertification: MyCertification;
  submitHandler?: Function;
}

const MyCertCard = ({ myCertification, submitHandler }: IMyCertCardProps) => {
  const { role } = useSelector((state: RootState) => state.config);
  return (
    <Grid item>
      <Grid container sx={{ textAlign: "start" }}>
        <Card sx={{ maxWidth: 300 }}>
          <CardHeader title={myCertification.certification?.name} />
          <CardMedia
            component="img"
            height="194"
            image={require(`../../assets/images/${
              myCertification.certification?.associateNFT !==
              "0x0000000000000000000000000000000000000000"
                ? "logo512"
                : "no-nft"
            }.png`)}
            alt="NFT Certification Image"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {myCertification.certification?.description}
            </Typography>
            <li>
              <strong>Issuer:</strong> {myCertification.issuer}
            </li>
            <li>
              <strong>Recipient:</strong> {myCertification.recipient}
            </li>
            <li>
              <strong>Status:</strong> {myCertification.status}
            </li>
            {role === "certifier" &&
              myCertification.status === "In Progress" &&
              submitHandler && (
                <Button
                  variant="outlined"
                  sx={{ marginTop: "20px" }}
                  onClick={() => submitHandler(myCertification)}
                >
                  Submit Certification
                </Button>
              )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MyCertCard;
