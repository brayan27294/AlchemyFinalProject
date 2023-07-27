import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import CreateCertForm from "../components/Certifications/CreateCertForm";
import ModalLayout from "../components/Common/ModalLayout";
import ListCertifications from "../components/Certifications/ListCertifications";
import { fetchCertifications } from "../redux/actions/certificationActions";
import { setModalState } from "../redux/reducers/modalReducer";

const CertificationPage = () => {
  const { address } = useSelector((state: RootState) => state.config);
  const { isCreateCertOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    if (address) {
      dispatch(fetchCertifications(address));
    }
  }, [address, dispatch]);

  const handleModalCreate = (isOpen: boolean) => {
    dispatch(setModalState({ isCreateCertOpen: isOpen }));
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sx={{ textAlign: "start" }}>
        <Button variant="outlined" onClick={() => handleModalCreate(true)}>
          Create
        </Button>
      </Grid>
      <ListCertifications />
      {isCreateCertOpen && (
        <ModalLayout
          handleClose={() => handleModalCreate(false)}
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
