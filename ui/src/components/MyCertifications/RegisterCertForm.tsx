import React from "react";
import { Button, Grid } from "@mui/material";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Certification } from "../../utils/types";
import CertCard from "../Common/CertCard";
import { registerClient } from "../../redux/actions/myCertificationActions";

interface IRegisterFormProps {
  certification: Certification;
  onCloseHandler: Function;
}

const RegisterCertForm = ({
  certification,
  onCloseHandler,
}: IRegisterFormProps) => {
  const { address } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();

  const onSubmitHandler = () => {
    dispatch(
      registerClient(
        certification.certificateId || 0,
        address,
        certification.certifier
      )
    );
  };

  return (
    <Grid container sx={{ textAlign: "start" }}>
      <Grid item xs={12}>
        <p>
          Do you want to procced with the registration of this certification?
        </p>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: "30px" }}>
        <CertCard key={`certCard_register`} certification={certification} />
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
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegisterCertForm;
