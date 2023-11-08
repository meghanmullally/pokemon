import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import PokemonTypeIcons from './TypeIcons';

export default function PokemonCard({ pokemon }) {

    const [pokemonData, setpokemonData] = useState(null);

    useEffect(() => {

        // url can take pokemon name or id, using name since that is what comes back in the fetch in app.js
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;

        fetch(url)
            .then((response) => {
                const data = response.json();
                return data;
            })
            .then((data) => {
                console.log("pokemonData = ", data)
                //   console.log("data.results = ", data.results);
                setpokemonData(data);
            })
            .catch((error) => {
                console.error('Error fetching Pokemon data:', error);
            });

    }, [pokemon]);

    if (!pokemonData) {
        return null; // or some loading indicator
    }


    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    // const getBackgroundColor = (types) => {
    //     const firstType = types[0].type.name;
    //     return typeColors[firstType] || 'white'; // Default to white if color is not found
    //   };

    const getBackgroundColor = (types) => {
        const firstType = types[0].type.name;
        const color = typeColors[firstType] || 'white'; // Default to white if color is not found
        return `${color}30`; // Add 80 (hexadecimal for 128, which is 50% opacity) to the color
    };

    console.log("setpokemonData", setpokemonData);
    console.log("pokemonData", pokemonData);

    const defaultPokemonImageUrl = 'src/img/default_pokemon.png';
    let pokemonImgUrl = pokemonData?.id
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`
        : defaultPokemonImageUrl;

    console.log("pokemonImgUrl", pokemonImgUrl)

    return (
                <Card style={{ backgroundColor: getBackgroundColor(pokemonData.types) }}>
                <CardMedia
                    component="img"
                    alt="pokemon image"
                    height={{ height: '100%' }}
                    image={pokemonImgUrl} // default image
                    />
                    {pokemonData && <PokemonTypeIcons types={pokemonData.types} />}
                <Divider variant="middle" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {pokemon.name}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                    {pokemon.url}
                </Typography> */}
                </CardContent>
                {/* <CardActions> */}
                {/* {pokemonData && <PokemonTypeIcons types={pokemonData.types} />} */}
                {/* </CardActions> */}
            </Card>
    );
}