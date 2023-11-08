import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Badge, Button, Divider } from '@mui/material';
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

    console.log("setpokemonData", setpokemonData);
    console.log("pokemonData", pokemonData);

    const defaultPokemonImageUrl = 'src/img/default_pokemon.png';
    let pokemonImgUrl = pokemonData?.id
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`
        : defaultPokemonImageUrl;

    console.log("pokemonImgUrl", pokemonImgUrl)

    return (
        <Badge anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
            color="success"
            badgeContent={pokemonData.id}>
            <Card>
                <CardMedia
                    component="img"
                    alt="pokemon image"
                    height={{ height: '100%' }}
                    image={pokemonImgUrl} // default image
                />
                <Divider variant="middle" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {pokemon.name}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                    {pokemon.url}
                </Typography> */}
                    {pokemonData && <PokemonTypeIcons types={pokemonData.types} />}
                </CardContent>
                {/* <CardActions>
                {pokemonData && <PokemonTypeIcons types={pokemonData.types} />}
            </CardActions> */}
            </Card>
        </Badge>
    );
}