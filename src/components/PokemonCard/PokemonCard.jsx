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
  const getBackgroundColor = (types) => {
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

// Type Colors and Card Background Color single color
// const getBackgroundColor = (types) => {
//   if (types && types.length > 0) {
//     const firstType = types[0].type.name;  // Extract the primary type's name
//     const color = TYPE_COLORS[firstType] || 'white'; // Default to white if color is not found
//     return `${color}30`; // Add '30' for a slight transparency effect
//   } else {
//     // Handle the case when types is undefined or an empty array
//     return 'white'; // Provide a default color
//   }
// };

  return (
    <React.Fragment key={pokemonId}>
      <NavLink className="nav-link" to={{ pathname: `/pokemon/${pokemonId}` }}>
        <Paper elevation={6} className="pokePaper">
          <Card style={{ background: getBackgroundColor(types) }}> 
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