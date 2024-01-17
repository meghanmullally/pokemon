import React from "react";
import { Paper, Typography } from "@mui/material";
import PokemonCard from "../PokemonCard/PokemonCard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { POKEMON_LIMIT } from "../../constants/pokemon";
import "./Evolution.css";


export default function Evolution({ evolutionData }) {
  //   const { evolutionData } = props;

  console.log("--------------------------------");
  console.log("IN EVOLUTION COMP");
  console.log("evolutionData", evolutionData);

  return (
    <>
      <Paper>
        <Typography variant="h3">Evolution Chain</Typography>
        <div className="evoContainer">
          <div className="evoPoke">
            {evolutionData.map((pokemon) => {
              const { id, name, sprite } = pokemon;
              console.log("id", id);
              console.log("pokemon", pokemon);

              if (parseInt(id) > POKEMON_LIMIT) {
                return null;
              } else {
                return (
                  <React.Fragment key={pokemon.id}>
                    <div className="evoCard">
                      <PokemonCard pokemonId={pokemon} />
                    </div>
                    <div className="evoArrow">
                      <KeyboardArrowRightIcon />
                    </div>
                  </React.Fragment>
                );
              }
            })}
          </div>
        </div>
      </Paper>
    </>
  );
}
