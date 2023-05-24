import * as React from 'react';
import { Grid } from '@mui/material';
import MyCertifications from '../components/Certifications/MyCertifications';

const MyCertPage = () => {
  //Load certifications
  return (
    <Grid container spacing={4}>
      <MyCertifications />
    </Grid>
  );
}

export default MyCertPage;