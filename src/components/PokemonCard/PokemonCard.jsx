import React from "react";
import { NavLink } from "react-router-dom";
import { Divider, Paper, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import PokemonTypeNameIcons from "../Type/TypeNameIcons";
import { TYPE_COLORS } from '../../constants/pokemon';
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
      <NavLink className="nav-link" to={{ pathname: `/pokemon/${id}` }}>
        <Paper className="pokemonCardPaper">
          <Card className="pokeCard" 
          // style={{ backgroundColor: getBackgroundColor(types) }}
          >
            <CardMedia
              className="pokeCardImg"
              component="img"
              alt={`${name} pokemon image`}
              src={sprite} // default image
            />
            <Divider variant="middle" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </NavLink>
    </React.Fragment>
  );
}
