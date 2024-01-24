import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import Header from '../Header/Header';
import { Box, Grid, CircularProgress } from "@mui/material";
import "./Pokedex.css";

const Pokedex = ({ pokemonData, optionData }) => {

  return (
<>
  <Header optionData={optionData}/>
    <Box sx={{ width: "100%" }}>
    { pokemonData !== null ? (
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className="pokedexContainer"
        >
        {/* Mapping through the pokemon data that is sent over from App.js and displaying the pokemon's name */}
        {pokemonData &&
          pokemonData.map((pokemonId) => (
            <React.Fragment key={pokemonId.id}>
            <Grid item xs={2}>
              <PokemonCard pokemonId={pokemonId} />
            </Grid>
            </React.Fragment>
          ))}
      </Grid>
      ) : (
        <CircularProgress/>
      )}
    </Box>
</>
  );
};

export default Pokedex;