import React from "react";
import { Button, Grid } from "@mui/material";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { MyCertification } from "../../utils/types";
import MyCertCard from "../Common/MyCertCard";
import { issueClientCertificate } from "../../redux/actions/myCertificationActions";

interface ISubmitCertFormProps {
  myCertification: MyCertification;
  onCloseHandler: Function;
}

const SubmitCertForm = ({
  myCertification,
  onCloseHandler,
}: ISubmitCertFormProps) => {
  const { address } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();

  const onSubmitHandler = () => {
    dispatch(issueClientCertificate(myCertification, address));
  };

  return (
    <Grid container sx={{ textAlign: "start" }}>
      <Grid item xs={12}>
        <p>Do you want to submit this certification?</p>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: "30px" }}>
        <MyCertCard key={`certCard_submit`} myCertification={myCertification} />
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onCloseHandler()}
        >
          Cancel
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" color="success" onClick={onSubmitHandler}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default SubmitCertForm;
