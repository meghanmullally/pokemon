import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import './Search.css';

export default function Search({ optionData }) {
    

  return (
    <Stack spacing={2} sx={{ width: 300 }} className='autoCompleteContainer'>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={optionData.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}
