import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import './Search.css';

export default function Search({ searchOptionData }) {
  
  const options = searchOptionData ? searchOptionData.map((option) => option.name) : [];
  const latestSearches = [];

  console.log("searchOptionData", searchOptionData);

  return (
    <Stack spacing={2} sx={{ width: 300 }} className='autoCompleteContainer'>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        autoSelect
        options={options}
       // add a group
        groupBy={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for Pokemon"
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
