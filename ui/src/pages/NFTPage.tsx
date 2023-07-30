import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import ListNFTs from "../components/NFT/ListNFT";
import ModalLayout from "../components/Common/ModalLayout";
import CreateNFTForm from "../components/NFT/CreateNFTForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchNFTs } from "../redux/actions/nftActions";
import { setModalState } from "../redux/reducers/modalReducer";

const NFTPage = () => {
  const { address } = useSelector((state: RootState) => state.config);
  const { isCreateNftOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    if (address) {
      dispatch(fetchNFTs(address));
    }
  }, [address, dispatch]);

  const handleModalCreate = (isOpen: boolean) => {
    dispatch(setModalState({ isCreateNftOpen: isOpen }));
  };
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sx={{ textAlign: "start" }}>
        <Button variant="outlined" onClick={() => handleModalCreate(true)}>
          Create
        </Button>
      </Grid>
      <ListNFTs />
      {isCreateNftOpen && (
        <ModalLayout
          handleClose={() => handleModalCreate(false)}
          maxWidth="sm"
          title="Create New NFT"
        >
          <CreateNFTForm />
        </ModalLayout>
      )}
    </Grid>
  );
};

export default NFTPage;
