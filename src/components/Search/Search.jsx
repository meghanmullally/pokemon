import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppSelector } from '../../app/hooks';
import './Search.css';

export default function Search({ onChange, label }) {
  // Fetch data from Redux store
  const searchOptionData = useAppSelector(state => state.pokemon.searchOptionData);
  const historyData = useAppSelector(state => state.pokemon.historyData);

  // Filter out duplicates in searchOptionData and historyData
  const uniqueSearchOptions = searchOptionData.filter(
    (option, index, self) => index === self.findIndex((t) => t.name === option.name)
  );

  const uniqueHistoryData = historyData.filter(
    (option, index, self) => index === self.findIndex((t) => t.name === option.name)
  );

  const latestSearches = [];

  return (
    <div className='searchContainer'>
      <Autocomplete
        freeSolo
        id="searchPokemon"
        disableClearable
        autoSelect
        options={uniqueSearchOptions.map((option) => option.name)}
        groupBy={(name) => {
          let header = '';
          if (uniqueHistoryData.find(element => element.name === name)) {
            if (!latestSearches.includes(name)) {
              latestSearches.push(name);
            }
            header = 'Latest Searches';
          } else {
            header = name[0].toUpperCase();
          }
          return header;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            className='searchInput'
            variant='standard'
            label={label}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            onChange={onChange}
            onSelect={onChange}
          />
        )}
      />
    </div>
  );
}