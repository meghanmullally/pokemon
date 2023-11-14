import React from 'react';
import PokemonCard from '../PokemonCard';
import { Box, Grid } from '@mui/material';
import './Pokedex.css';

const Pokedex = ({ pokemonStateList }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="pokedexContainer">
            {/* Mapping through the pokemon data that is sent over from App.js and displaying the pokemon's name */}
                {pokemonStateList.map((pokemonItem) => (
                    <Grid item xs={2} key={pokemonItem.name}>
                        <PokemonCard pokemon={pokemonItem} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
    
};

export default Pokedex;