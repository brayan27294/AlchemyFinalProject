import React, { FormEvent, useRef } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NFT } from "../../utils/types";
import { createNFT } from "../../redux/actions/nftActions";

const CreateNFTForm = () => {
  const { address } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const symbolInputRef = useRef<HTMLInputElement>(null);
  const nftUrlInputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const nft: NFT = {
      name: nameInputRef?.current?.value || "",
      symbol: symbolInputRef?.current?.value || "",
      nftUrl: nftUrlInputRef?.current?.value || "",
      nftOwnerAddress: address,
      associateAccounts: [address],
    };
    dispatch(createNFT(nft, address));
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <TextField
        id="standard-name"
        label="Name"
        variant="standard"
        fullWidth
        inputRef={nameInputRef}
      />
      <TextField
        id="standard-symbol"
        label="Symbol"
        variant="standard"
        fullWidth
        inputRef={symbolInputRef}
      />
      <TextField
        id="standard-multiline-nft"
        label="NFT Data"
        multiline
        rows={4}
        inputRef={nftUrlInputRef}
        variant="standard"
        fullWidth
      />
      <Grid container sx={{ textAlign: "start" }}>
        <Grid item xs={12} justifyContent="flex-start">
          <Button type="submit" variant="outlined" color="success">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateNFTForm;
