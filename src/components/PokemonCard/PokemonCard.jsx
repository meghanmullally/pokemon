import React from "react";
import { NavLink } from "react-router-dom";
import { Paper, Card, CardContent, CardMedia } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { TYPE_COLORS } from '../../constants/pokemon';
import "./PokemonCard.css";

export default function PokemonCard(props) {

  const pokemonData = useAppSelector(state => state.pokemon.pokemonData);

  // props is returning each id of each pokemon
  const { pokemonId } = props;
  // Destructuring properties from pokemonData
  const { id, name, sprite, types } = pokemonData[pokemonId] || {};

  // Type Colors and Card Background Color with 50% opacity
  const getBorderColor = (types) => {
    if (types?.length >= 2) {
      // Extract colors for each type and add '80' for 50% opacity
      const colors = types.map((t) => `${TYPE_COLORS[t.type.name] || "white"}80`);
      // Create a gradient using all colors with opacity
      return `linear-gradient(to bottom, ${colors.join(', ')})`;
    } else if (types?.length === 1) {
      // If only one type, use its color with 50% opacity
      return `${TYPE_COLORS[types[0].type.name] || "white"}80`;
    }
    return "white"; // Default color
  };

  return (
    <React.Fragment key={pokemonId}>
      <NavLink className="nav-link" to={{ pathname: `/pokemon/${pokemonId}` }}>
        <Paper elevation={6} className="pokePaper">
          <Card style={{ background: getBorderColor(types) }}> {/* Use the gradient as the background */}
            <CardMedia
              className="cardMedia"
              image={sprite}
              alt={`${name} pokemon image`}
              sx={{ backgroundSize: "contain" }}
            />
            <CardContent className="cardContent">
              <div className="pokemonTagContainer">
                <div className="pokemonId">#{id}</div>
                <div className="pokemonName">{name?.toUpperCase()}</div>
              </div>
            </CardContent>
          </Card>
        </Paper>
      </NavLink>
    </React.Fragment>
  );
}