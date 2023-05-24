import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import CreateCertForm from '../components/Certifications/CreateCertForm';
import ModalLayout from '../components/Common/ModalLayout';
import ListCertifications from '../components/Certifications/ListCertifications';

const CertificationPage = () => {
  const { role } = useSelector((state: RootState) => state.config);
  const [openModal, setOpenModal] = useState(false);
  return (
    <Grid container spacing={4}>
      {role === 'certifier' && <Grid item xs={12} sx={{textAlign: 'start'}}>
        <Button variant='outlined' onClick={()=>setOpenModal(true)}>Create</Button>
      </Grid>}
      <ListCertifications />
      {openModal &&
        <ModalLayout
          handleClose={()=>setOpenModal(false)}
          maxWidth='sm'
          title='Create New Certification'>
            <CreateCertForm/>
        </ModalLayout>}
    </Grid>
  );
}

export default CertificationPage;