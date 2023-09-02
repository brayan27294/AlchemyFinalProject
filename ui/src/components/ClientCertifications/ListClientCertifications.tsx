import React, { useState } from "react";
import { Grid } from "@mui/material";
import MyCertCard from "../Common/MyCertCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MyCertification } from "../../utils/types";
import { setModalState } from "../../redux/reducers/modalReducer";
import ModalLayout from "../Common/ModalLayout";
import SubmitCertForm from "./SubmitCertForm";

const initialState: MyCertification = {
  certificateId: 0,
  issuerCertificateId: 0,
  recipient: "",
  issueDate: new Date(),
  issuer: "",
  status: "",
  isValid: false,
  certification: {
    certificateId: 0,
    certifier: "",
    name: "",
    description: "",
    associateNFT: "",
    requirements: [],
  },
};

const ListClientCertifications = () => {
  const [selectedCertification, setSelectedCertification] =
    useState<MyCertification>(initialState);
  const { issuerCertifications } = useSelector(
    (state: RootState) => state.myCertification
  );
  const { isSubmitCertOpen } = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

  const handleOpenSubmit = (certification: MyCertification) => {
    setSelectedCertification(certification);
    dispatch(setModalState({ isSubmitCertOpen: true }));
  };

  const handleCloseRegister = () => {
    setSelectedCertification(initialState);
    dispatch(setModalState({ isSubmitCertOpen: false }));
  };

  const items = [];
  for (let i = 0; i < issuerCertifications.length; i++) {
    const myCertification = issuerCertifications[i];
    items.push(
      <MyCertCard
        key={`myCertCard_${i}`}
        myCertification={myCertification}
        submitHandler={handleOpenSubmit}
      />
    );
  }
  return (
    <Grid item xs={12}>
      <Grid container spacing={4}>
        {items}
      </Grid>
      {isSubmitCertOpen && (
        <ModalLayout
          handleClose={() => handleCloseRegister()}
          maxWidth="sm"
          title="Submit Certification"
        >
          <SubmitCertForm
            myCertification={selectedCertification}
            onCloseHandler={handleCloseRegister}
          />
        </ModalLayout>
      )}
    </Grid>
  );
};

export default ListClientCertifications;
