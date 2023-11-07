import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
// import Pokemon from './Pokemon';

export default function PokemonCard({ pokemon }) {

    const [pokemonData, setpokemonData] = useState(null);

    useEffect(() => {

        if (!pokemon) return;

        // url can take pokemon name or id
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

    console.log("setpokemonData", setpokemonData);
    console.log("pokemonData", pokemonData);


    let pokemonHeight = null;
    let pokemonWeight = null;

    if (pokemonData) {
        // The pokemon's height in decimetres which is converted into metres by dividing by 10
        pokemonHeight = (pokemonData.height / 10);
        // The pokemon's weight in hectograms which is converted into kilograms by dividing by 10
        pokemonWeight = (pokemonData.weight / 10);
    }

    if (!pokemon) return null;

    return (
        <Card>
            <CardMedia
                component="img"
                alt="pokemon image"
                height={{ height: '100%' }}
                image={pokemonData ? pokemonData.sprites.front_default : ""} // default image
            />
            <Divider variant="middle" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {pokemon.name}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                    {pokemon.url}
                </Typography> */}
            </CardContent>
            <CardActions>
                {pokemonData && (
                    <>
                        <HeightIcon />
                        <p>{pokemonHeight} m</p>
                        <ScaleIcon />
                        <p>{pokemonWeight} kg</p>
                    </>
                )}
            </CardActions>
        </Card>
    );
}