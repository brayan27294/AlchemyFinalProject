import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import ListNFTs from '../components/NFT/ListNFT';
import ModalLayout from '../components/Common/ModalLayout';
import CreateNFTForm from '../components/NFT/CreateNFTForm';

const NFTPage = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sx={{textAlign: 'start'}}>
        <Button variant='outlined' onClick={()=>setOpenModal(true)}>Create</Button>
      </Grid>
      <ListNFTs />
      {openModal &&
        <ModalLayout
          handleClose={()=>setOpenModal(false)}
          maxWidth='sm'
          title='Create New NFT'>
            <CreateNFTForm/>
        </ModalLayout>}
    </Grid>
  );
}

export default NFTPage;