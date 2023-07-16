import React, { useState } from "react";
import { Grid } from "@mui/material";
import NFTCard from "./NFTCard";
import ModalLayout from "../Common/ModalLayout";
import CreateNFTForm from "./CreateNFTForm";

const ListNFTs = () => {
  const [openModal, setOpenModal] = useState(false);
  const items: any[] = [];
  for (let i = 0; i < 8; i++) {
    const nft = {
      name: `NFT Name ${i + 1}`,
      description: `NFT Description ${i + 1}`,
    };
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
