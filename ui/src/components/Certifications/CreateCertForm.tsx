import React, { FormEvent, useRef, useState } from "react";
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
import { Certification } from "../../utils/types";

const availableNFTs = [
  {
    value: "0 ",
    label: "No NFT",
  },
  {
    value: "nft1",
    label: "NFT 1",
  },
  {
    value: "nft2",
    label: "NFT 2",
  },
  {
    value: "nft3",
    label: "NFT 3",
  },
  {
    value: "nft4",
    label: "NFT 4",
  },
];

const CreateCertForm = () => {
  const { address } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();
  const [requirements, setRequirements] = useState<String[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const nftURLInputRef = useRef<HTMLSelectElement>(null);
  const requirementInputRef = useRef<HTMLInputElement>(null);

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
      description: nameInputRef?.current?.value || "",
      nftUrl: nftURLInputRef?.current?.value || "",
      requirements,
      address,
    };
    dispatch(createCertification(certification, address));
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
        label="Available NFTs"
        SelectProps={{
          native: true,
        }}
        inputRef={nftURLInputRef}
        variant="standard"
        fullWidth
      >
        {availableNFTs.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
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
