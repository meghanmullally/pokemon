import React from "react";
import { Paper, Typography } from "@mui/material";
import PokemonCard from "../PokemonCard/PokemonCard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { POKEMON_LIMIT } from "../../constants/pokemon";
import "./Evolution.css";

export default function Evolution({ evolutionData }) {

  console.log("--------------------------------");
  console.log("IN EVOLUTION - evolution data", evolutionData);

  return (
    <>
      <Paper>
        <Typography gutterBottom variant="h4">Evolution Chain</Typography>
          <div className="evoPoke">
            {evolutionData.map((pokemon) => {
              const { id } = pokemon;

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
      </Paper>
    </>
  );
}
