import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import AvailableCertifications from "../components/MyCertifications/AvailableCertifications";
import { useDispatch } from "react-redux";
import { fetchAllCertifications } from "../redux/actions/certificationActions";

const AvailableCertificationPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCertifications());
  }, [dispatch]);
  return (
    <Grid container spacing={4}>
      <h2>Avaiable Certifications Page</h2>
      <AvailableCertifications />
    </Grid>
  );
};

export default AvailableCertificationPage;
