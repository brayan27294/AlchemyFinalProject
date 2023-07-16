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
  certification: {
    name: string;
    description: string;
    requirements: string[];
  };
  editHandler?: Dispatch<SetStateAction<boolean>>;
}

const CertCard = ({ certification, editHandler }: ICertCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { role } = useSelector((state: RootState) => state.config);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={certification.name} />
        <CardMedia
          component="img"
          height="194"
          image={require("../../assets/images/logo512.png")}
          alt="NFT Certification Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.{certification.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {role === "client" && (
            <IconButton aria-label="Add">
              <AddIcon />
            </IconButton>
          )}
          {role === "certifier" && (
            <IconButton
              aria-label="Edit"
              onClick={() => (editHandler ? editHandler(true) : null)}
            >
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
