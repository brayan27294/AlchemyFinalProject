import * as React from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchIssuerCertifications } from "../redux/actions/myCertificationActions";
import ListClientCertifications from "../components/ClientCertifications/ListClientCertifications";

const ClientCertPage = () => {
  const { address } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (address) {
      dispatch(fetchIssuerCertifications(address));
    }
  }, [address, dispatch]);
  return (
    <Grid container spacing={4}>
      <h2>Client Certifications Page</h2>
      <ListClientCertifications />
    </Grid>
  );
};

export default ClientCertPage;
