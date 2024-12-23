import React from "react";
import { NavLink } from "react-router-dom";
import { Paper, Card, CardContent, CardMedia } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { getBackgroundColor } from "../../utils/pokemonHelpers";
import "./PokemonCard.css";

export default function PokemonCard({ pokemonId }) {
  const pokemonData = useAppSelector((state) => state.pokemon.pokemonData);

  if (!pokemonData) {
    // Avoid rendering if data is not available
    return null; 
  }


  const { id, name, sprite, types } = pokemonData[pokemonId] || {};

  return (
    <React.Fragment key={pokemonId}>
      <NavLink className="nav-link" to={`/pokemon/${pokemonId}`}>
        <Paper elevation={6} className="pokePaper">
          <Card style={{ background: getBackgroundColor(types) }}>
            <CardMedia
              className="cardMedia"
              image={sprite}
              alt={`${name || "Unknown"} Pokémon image`}
              sx={{ backgroundSize: "contain" }}
            />
            <CardContent className="cardContent">
              <div className="pokemonTagContainer">
                <div className="pokemonId">#{id}</div>
                <div className="pokemonName">{name?.toUpperCase() || "UNKNOWN"}</div>
              </div>
            </CardContent>
          </Card>
        </Paper>
      </NavLink>
    </React.Fragment>
  );
}