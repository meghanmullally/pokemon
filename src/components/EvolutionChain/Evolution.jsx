import React from "react";
import { Paper, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PokemonCard from "../PokemonCard/PokemonCard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { POKEMON_LIMIT } from "../../constants/pokemon";
import "./Evolution.css";

export default function Evolution({ evolutionData }) {
  return (
    <Paper className="evoContainer">
      <h3 className="evoTitle">Evolution Chain
        <Tooltip
          title="An evolution chain shows the sequence of Pokémon evolutions, starting from a base form and progressing through its evolutionary stages."
          arrow
        >
          <InfoOutlinedIcon className="infoIcon" />
        </Tooltip>
      </h3>
      <div className="evoPoke">
        {evolutionData.map((pokemon, index) => {
          const { id } = pokemon;

          if (parseInt(id) > POKEMON_LIMIT) {
            return null;
          } else {
            return (
              <React.Fragment key={pokemon.id}>
                <div className="evoCard">
                  <PokemonCard pokemonId={pokemon.id} />
                </div>
                {index < evolutionData.length - 1 && (
                  <div className="evoArrow">
                    <KeyboardArrowRightIcon />
                  </div>
                )}
              </React.Fragment>
            );
          }
        })}
      </div>
    </Paper>
  );
}