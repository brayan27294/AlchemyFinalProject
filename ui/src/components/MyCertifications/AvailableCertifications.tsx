import React, { useState } from "react";
import { Grid } from "@mui/material";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import CertCard from "../Common/CertCard";
import { setModalState } from "../../redux/reducers/modalReducer";
import ModalLayout from "../Common/ModalLayout";
import RegisterCertForm from "./RegisterCertForm";
import { Certification } from "../../utils/types";

const initialState: Certification = {
  certificateId: 0,
  certifier: "",
  name: "",
  description: "",
  associateNFT: "",
  requirements: [],
};

const AvailableCertifications = () => {
  const [certification, setCertification] =
    useState<Certification>(initialState);
  const { certifications } = useSelector(
    (state: RootState) => state.certification
  );
  const { isRegisterCertOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const handleOpenRegister = (certificateId: Number, certifier: String) => {
    const selectedCertification = certifications.find(
      (cert: Certification) =>
        cert.certificateId === certificateId && cert.certifier === certifier
    );
    setCertification(selectedCertification);
    dispatch(setModalState({ isRegisterCertOpen: true }));
  };

  const handleCloseRegister = () => {
    setCertification(initialState);
    dispatch(setModalState({ isRegisterCertOpen: false }));
  };

  const items = [];
  for (let i = 0; i < certifications.length; i++) {
    const certification = certifications[i];
    items.push(
      <CertCard
        key={`certCard_${i}`}
        certification={certification}
        associateHandler={handleOpenRegister}
      />
    );
  }
  return (
    <Grid item xs={12}>
      <Grid container spacing={4}>
        {items}
      </Grid>
      {isRegisterCertOpen && (
        <ModalLayout
          handleClose={() => handleCloseRegister()}
          maxWidth="sm"
          title="Register for Certification"
        >
          <RegisterCertForm
            certification={certification}
            onCloseHandler={handleCloseRegister}
          />
        </ModalLayout>
      )}
    </Grid>
  );
};

export default AvailableCertifications;
