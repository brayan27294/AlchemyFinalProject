import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Add as AddIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { IconButtonProps } from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Certification } from "../../utils/types";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ICertCardProps {
  certification: Certification;
  editHandler?: Dispatch<SetStateAction<boolean>>;
  associateHandler?: Function;
}

const CertCard = ({
  certification,
  editHandler,
  associateHandler,
}: ICertCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { role } = useSelector((state: RootState) => state.config);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item>
      <Card sx={{ maxWidth: 300 }}>
        <CardHeader title={certification.name} />
        <CardMedia
          component="img"
          height="194"
          image={require(`../../assets/images/${
            certification.associateNFT !==
            "0x0000000000000000000000000000000000000000"
              ? "logo512"
              : "no-nft"
          }.png`)}
          alt="NFT Certification Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {certification.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {role === "client" && associateHandler && (
            <Tooltip title={"Register for this certification"}>
              <IconButton
                aria-label="Add"
                onClick={() =>
                  associateHandler(
                    certification.certificateId,
                    certification.certifier
                  )
                }
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
          {role === "certifier" && editHandler && (
            <IconButton aria-label="Edit" onClick={() => editHandler(true)}>
              <EditIcon />
            </IconButton>
          )}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Tooltip
              title={expanded ? "Hide Requirements" : "Show Requirements"}
            >
              <ExpandMoreIcon />
            </Tooltip>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Requirements:</Typography>
            <FormGroup>
              {certification.requirements.map((item, index) => (
                <FormControlLabel
                  key={`rerquirement_${certification.name}_${index}`}
                  control={<Checkbox />}
                  label={item}
                />
              ))}
            </FormGroup>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default CertCard;
