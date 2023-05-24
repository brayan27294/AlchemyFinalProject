import React from 'react';
import { TextField } from '@mui/material';

const options = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const CreateCertForm = () => {
  return (
    <form>
      <TextField
          id="standard-name"
          label="Name"
          variant="standard"
          fullWidth
        />
        <TextField
          id="standard-multiline-description"
          label="Multiline"
          multiline
          rows={4}
          variant="standard"
          fullWidth
        />
         <TextField
          id="standard-select-options"
          select
          label="Options"
          SelectProps={{
            native: true,
          }}
          variant="standard"
          fullWidth
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
    </form>
  );
}

export default CreateCertForm;