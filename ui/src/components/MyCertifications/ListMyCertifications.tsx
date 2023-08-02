import React from "react";
import { Grid } from "@mui/material";
import MyCertCard from "../Common/MyCertCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ListMyCertifications = () => {
  const { myCertifications } = useSelector(
    (state: RootState) => state.myCertification
  );
  const items = [];
  for (let i = 0; i < myCertifications.length; i++) {
    const myCertification = myCertifications[i];
    items.push(
      <MyCertCard key={`myCertCard_${i}`} myCertification={myCertification} />
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

export default ListMyCertifications;
