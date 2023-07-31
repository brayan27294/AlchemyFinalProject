import React from "react";
import { Grid } from "@mui/material";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import CertCard from "../Certifications/CertCard";

const AvailableCertifications = () => {
  const { certifications } = useSelector(
    (state: RootState) => state.certification
  );
  const items = [];
  for (let i = 0; i < certifications.length; i++) {
    const certification = certifications[i];
    items.push(
      <CertCard key={`certCard_${i}`} certification={certification} />
    );
  }
  return (
    <Grid item xs={12}>
      <Grid container spacing={4}>
        {items}
      </Grid>
    </Grid>
  );
};

export default AvailableCertifications;
