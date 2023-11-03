import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pokemon from './Pokemon';

export default function PokemonCard({pokemon}) {

console.log("item inside pokemonCard", pokemon)

if(!pokemon) return null; 

  return (
    <Card> 
   {/* sx={{ maxWidth: 100% }} */}
      <CardMedia
        component="img"
        alt="pokemon image"
        height="140"
        image="" // Set the image URL here later
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pokemon.url}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">type logo?</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}