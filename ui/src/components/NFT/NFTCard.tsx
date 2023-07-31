import React, { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NFT } from "../../utils/types";

interface INFTCardProps {
  nft: NFT;
  editHandler: Dispatch<SetStateAction<boolean>>;
}

const NFTCard = ({ nft, editHandler }: INFTCardProps) => {
  const { role } = useSelector((state: RootState) => state.config);
  return (
    <Grid item>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={`${nft.name} (${nft.symbol})`} />
        <CardMedia
          component="img"
          height="194"
          image={require("../../assets/images/nft.png")}
          alt="NFT Certification Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {nft.nftUrl}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {nft.isCertificateAssociate
              ? "Certificate associated"
              : "Certificate not associate"}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {role === "certifier" && (
            <IconButton aria-label="Edit" onClick={() => editHandler(true)}>
              <EditIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default NFTCard;
