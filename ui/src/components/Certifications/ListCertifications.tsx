import React, { useState } from "react";
import { Grid } from "@mui/material";
import CertCard from "./CertCard";
import ModalLayout from "../Common/ModalLayout";
import CreateCertForm from "./CreateCertForm";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const ListCertifications = () => {
  const [openModal, setOpenModal] = useState(false);
  const { certifications } = useSelector(
    (state: RootState) => state.certification
  );
  const items = [];
  for (let i = 0; i < certifications.length; i++) {
    const certification = certifications[i];
    items.push(
      <CertCard
        key={`certCard_${i}`}
        certification={certification}
        editHandler={setOpenModal}
      />
    );
  }
  return (
    <Grid item xs={12}>
      <Grid container spacing={4}>
        {items}
      </Grid>
      {openModal && (
        <ModalLayout
          handleClose={() => setOpenModal(false)}
          maxWidth="sm"
          title="Edit Certification"
        >
          <CreateCertForm />
        </ModalLayout>
      )}
    </Grid>
  );
};

export default ListCertifications;
