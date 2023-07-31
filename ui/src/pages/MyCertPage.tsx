import * as React from "react";
import { Grid } from "@mui/material";
import ListMyCertifications from "../components/MyCertifications/ListMyCertifications";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchMyCertifications } from "../redux/actions/myCertificationActions";

const MyCertPage = () => {
  const { address } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (address) {
      dispatch(fetchMyCertifications(address));
    }
  }, [address, dispatch]);
  return (
    <Grid container spacing={4}>
      <ListMyCertifications />
    </Grid>
  );
};

export default MyCertPage;
