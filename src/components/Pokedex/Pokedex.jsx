import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import Header from '../Header/Header';
import { Grid, CircularProgress } from "@mui/material";
import { useAppSelector } from '../../app/hooks';
import "./Pokedex.css";

const Pokedex = ({ searchOptionData })  => {

  const pokemonData = useAppSelector(state => state.pokemon.pokemonData);
  const filterSearch = useAppSelector(state => state.pokemon.filterSearch);

  return (
    <>
  <Header searchOptionData={searchOptionData}/>
    { pokemonData !== null ? (
      <Grid
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      className="pokedexContainer"
      >
        {pokemonData &&
          Object.keys(pokemonData).map((pokemonId) => 
          (
            pokemonData[pokemonId].name.includes(filterSearch) &&
              <React.Fragment key={pokemonId}>
              <Grid item xs={2}>
                <PokemonCard pokemonId={pokemonId} />
              </Grid>
              </React.Fragment>
          ))}
      </Grid>
      ) : (
        <CircularProgress/>
        )}
</>
  );
};

export default Pokedex;