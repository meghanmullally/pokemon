import React from "react";
import { NavLink } from "react-router-dom";
import { Paper, Card, CardContent, CardMedia } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
// import PokemonTypeNameIcons from "../Type/TypeNameIcons";
// import { TYPE_COLORS } from '../../constants/pokemon';
import "./PokemonCard.css";

export default function PokemonCard(props) {

  const pokemonData = useAppSelector(state => state.pokemon.pokemonData);

  // props is returning each id of each pokemon
  const { pokemonId } = props;
  // Destructuring properties from pokemonId
  const { id, name, sprite } = pokemonData[pokemonId] || {};

  // Type Colors and Card Background Color
  // const getBackgroundColor = (types) => {
  //     if (types && types.length > 0) {
  //         const firstType = types[0].type.name;
  //         const color = TYPE_COLORS[firstType] || 'white30'; // Default to white if color is not found
  //         return `${color}30`; // Add 80 (hexadecimal for 128, which is 50% opacity) to the color
  //     } else {
  //         // Handle the case when types is undefined or an empty array
  //         return 'white30'; // You can provide a default color or handle it as needed
  //     }
  // };

  return (
    <React.Fragment key={pokemonId}>
      <NavLink className="nav-link" to={{ pathname: `/pokemon/${pokemonId}` }}>
        <Paper elevation={6} className="pokePaper">
          <Card>
            {/* style={{ backgroundColor: getBackgroundColor(types) }}  */}
            <CardMedia
              className="cardMedia"
              image={sprite}
              alt={`${name} pokemon image`}
              sx={{ backgroundSize: "contain" }}
            />
            <CardContent className="cardContent">
              <div className="pokemonTagContainer">
                <div className="pokemonId">#{id}</div>
                <div className="pokemonName">{name.toUpperCase()}</div>
              </div>
            </CardContent>
          </Card>
        </Paper>
      </NavLink>
    </React.Fragment>
  );
}
