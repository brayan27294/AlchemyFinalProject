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
  const [requirements, setRequirements] = useState<String[]>([]);
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
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <TextField id="standard-name" label="Name" variant="standard" fullWidth />
      <TextField
        id="standard-multiline-description"
        label="Description"
        multiline
        rows={4}
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
          <Button type="submit">Create</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateCertForm;
