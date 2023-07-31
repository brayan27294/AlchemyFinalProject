import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createCertification } from "../../redux/actions/certificationActions";
import { Certification, NFT } from "../../utils/types";
import { fetchAvailableNFTs } from "../../redux/actions/nftActions";

const CreateCertForm = () => {
  const { address } = useSelector((state: RootState) => state.config);
  const { nfts } = useSelector((state: RootState) => state.nft);
  const dispatch = useDispatch();
  const [requirements, setRequirements] = useState<String[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const associateNFTInputRef = useRef<HTMLSelectElement>(null);
  const requirementInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (address) {
      dispatch(fetchAvailableNFTs(address));
    }
  }, [address, dispatch]);

  const handleAddRequirement = () => {
    if (requirementInputRef?.current?.value) {
      const newReq: string = requirementInputRef.current.value;
      setRequirements((prevItems) => [...prevItems, newReq]);
      requirementInputRef.current.value = "";
    }
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const certification: Certification = {
      name: nameInputRef?.current?.value || "",
      description: descriptionInputRef?.current?.value || "",
      associateNFT: associateNFTInputRef?.current?.value || "",
      requirements,
      certifier: address,
    };
    dispatch(createCertification(certification, address));
  };

  const nftsOptions = [
    {
      id: "0x0000000000000000000000000000000000000000",
      name: "No NFT Selected",
      symbol: "NA",
    },
    ...nfts,
  ];

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
        id="standard-multiline-description"
        label="Description"
        multiline
        rows={4}
        inputRef={descriptionInputRef}
        variant="standard"
        fullWidth
      />
      <TextField
        id="standard-select-options"
        select
        label="Associate NFTs"
        SelectProps={{
          native: true,
        }}
        inputRef={associateNFTInputRef}
        variant="standard"
        fullWidth
      >
        {nftsOptions.map((option: NFT) => (
          <option key={`key_${option?.nftId}`} value={`${option.nftId}`}>
            {`${option.name} (${option.symbol})`}
          </option>
        ))}
      </TextField>
      <Grid container sx={{ textAlign: "start" }}>
        <Grid item xs={10}>
          <TextField
            id="standard-name"
            label="New Requirement"
            variant="standard"
            fullWidth
            inputRef={requirementInputRef}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddRequirement}
          >
            ADD
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "10px" }}>
          <Typography paragraph>Requirements:</Typography>
        </Grid>
        <Grid item xs={6}>
          {requirements.map((item, index) => (
            <FormControlLabel
              key={`rerquirement_create_${index}`}
              control={<Checkbox />}
              label={item}
            />
          ))}
        </Grid>
        <Grid item xs={12} justifyContent="flex-start">
          <Button type="submit" variant="outlined" color="success">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateCertForm;
