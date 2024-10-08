import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppSelector } from '../../app/hooks';
import './Search.css';

export default function Search({ onChange, label }) {

  const searchOptionData = useAppSelector(state => state.pokemon.searchOptionData);
  const historyData = useAppSelector(state => state.pokemon.historyData);
  const latestSearches = [];
  
  
  return (
    <div className='searchContainer'>
      <Autocomplete
        freeSolo
        id="searchPokemon"
        disableClearable
        autoSelect
        options={searchOptionData ? searchOptionData.map((option) => option.name) : []}
        groupBy={(name) => {
          let header = '';
          if (historyData.find(element => element.name === name)) {
            if (!latestSearches.includes(name)) {
              latestSearches.push(name);
            }
            header = 'Latest Searches';
          } else {
            header = name[0].toUpperCase();
          }
          return header;
        }
        }
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
