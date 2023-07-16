import React from "react";
import { TextField } from "@mui/material";

const CreateNFTForm = () => {
  return (
    <form>
      <TextField id="standard-name" label="Name" variant="standard" fullWidth />
      <TextField
        id="standard-multiline-description"
        label="Multiline"
        multiline
        rows={4}
        variant="standard"
        fullWidth
      />
    </form>
  );
};

export default CreateNFTForm;
