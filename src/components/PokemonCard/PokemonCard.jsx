import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Divider, Paper } from '@mui/material';
import PokemonTypeIcons from '../TypeIcons';
import { TYPE_COLORS } from '../../constants/pokemon';
import './PokemonCard.css';

export default function PokemonCard(props) {

    const { pokemonId } = props;

    console.log("pokemonCard pokemonid", pokemonId);


    // Type Colors and Card Background Color
    const getBackgroundColor = (types) => {
        if (types && types.length > 0) {
            const firstType = types[0].type.name;
            const color = TYPE_COLORS[firstType] || 'white'; // Default to white if color is not found
            return `${color}30`; // Add 80 (hexadecimal for 128, which is 50% opacity) to the color
        } else {
            // Handle the case when types is undefined or an empty array
            return 'white30'; // You can provide a default color or handle it as needed
        }
    };

    // Pokemon Image
    const defaultPokemonImageUrl = 'src/img/default_pokemon.png';
    let pokemonImgUrl = pokemonId
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.id}.png`
        : defaultPokemonImageUrl;


    return (
        <>
            <NavLink to={`/pokemon/${pokemonId}`}  className="nav-link">
                <Paper>
                    <Card
                        style=
                        {
                            { backgroundColor: getBackgroundColor(pokemonId.types) }
                        }>
                        <CardMedia
                            component="img"
                            alt="pokemon image"
                            height={{ height: '100%' }}
                            image={pokemonImgUrl} // default image
                        />
                        {pokemonId && <PokemonTypeIcons types={pokemonId.types} />}
                        <Divider variant="middle" />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {pokemonId && pokemonId.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Paper>
            </NavLink>
        </>
    );
}