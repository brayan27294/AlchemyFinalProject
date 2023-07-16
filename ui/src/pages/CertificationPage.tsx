import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import CreateCertForm from "../components/Certifications/CreateCertForm";
import ModalLayout from "../components/Common/ModalLayout";
import ListCertifications from "../components/Certifications/ListCertifications";
import { fetchCertifications } from "../redux/actions/certificationActions";

const CertificationPage = () => {
  const { address } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (address) {
      dispatch(fetchCertifications(address));
    }
  }, [address, dispatch]);
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sx={{ textAlign: "start" }}>
        <Button variant="outlined" onClick={() => setOpenModal(true)}>
          Create
        </Button>
      </Grid>
      <ListCertifications />
      {openModal && (
        <ModalLayout
          handleClose={() => setOpenModal(false)}
          maxWidth="sm"
          title="Create New Certification"
        >
          <CreateCertForm />
        </ModalLayout>
      )}
    </Grid>
  );
};

export default CertificationPage;
