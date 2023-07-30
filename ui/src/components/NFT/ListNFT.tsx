import React, { useState } from "react";
import { Grid } from "@mui/material";
import NFTCard from "./NFTCard";
import ModalLayout from "../Common/ModalLayout";
import CreateNFTForm from "./CreateNFTForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ListNFTs = () => {
  const [openModal, setOpenModal] = useState(false);
  const { nfts } = useSelector((state: RootState) => state.nft);
  const items = [];
  for (let i = 0; i < nfts.length; i++) {
    const nft = nfts[i];
    items.push(
      <NFTCard key={`nftCard_${i}`} nft={nft} editHandler={setOpenModal} />
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
          title="Edit NFT"
        >
          <CreateNFTForm />
        </ModalLayout>
      )}
    </Grid>
  );
};

export default ListNFTs;
