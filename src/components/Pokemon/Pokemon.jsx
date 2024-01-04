import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Card, Divider, Tooltip } from '@mui/material';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
import CardMedia from '@mui/material/CardMedia';
import PokemonTypeIcons from '../TypeIcons';
import styles from './Pokemon.css';
// import ErrorPage from './Error';



const Pokemon = ({ pokemonData }) => {

  // specific pokemon details
  const [pokemonDetails, setPokemonDetails] = useState(null);

  console.log('pokemonDetails:', pokemonDetails);


  const params = useParams();
  console.log("params = ", params)
  let { pokemonId } = params;


  useEffect(() => {
    // url can take pokemon name or id, using name since that is what comes back in the fetch in app.js
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('In Pokemon - pokemonDetails = ', data);
        setPokemonDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching Pokemon data:', error);
        // Handle the error, show an error message, or redirect to an error page
      });
  }, [pokemonId]);

  console.log('pokemonDetails =', pokemonDetails);



  if (!pokemonDetails) {
    console.log('No pokemonDetails found');
    return null; // or some loading indicator
  }

  // Pokemon Height & Weight
  let pokemonHeight = null;
  let pokemonWeight = null;


  if (pokemonDetails) {
    // The pokemon's height in decimetres which is converted into metres by dividing by 10
    pokemonHeight = (pokemonDetails.height / 10);
    // The pokemon's weight in hectograms which is converted into kilograms by dividing by 10
    pokemonWeight = (pokemonDetails.weight / 10);
  }

  console.log("-------------------------------")
  console.log("Im in the pokemon function");
  console.log("pokemonDetails=", pokemonDetails);
  console.log('pokemonData:', pokemonData);
  console.log('pokemonData.sprite:', pokemonData.sprite);
  console.log('pokemonData.sprite[pokemonId]:', pokemonData.sprite && pokemonData.sprite[pokemonId]);
  
  return (
    <>
    <Card className='pokemon_card_container'>

      <div className="pokemonDetailsContainer">
        <div className='cardHeader'>
          <div className='pokemonID'>
            #{String(pokemonDetails.id).padStart(3, '0')}
          </div>
        </div>
      </div> {/* Detials Container End */}
      <div className='img_container'>
        <CardMedia
          component="img"
          alt="pokemon image"
          height={{ height: '100%' }}
          image={pokemonData && pokemonData[pokemonId - 1] && pokemonData[pokemonId - 1].sprite}
        />
      </div>
      <div className='pokemonName'>
        <h3>{pokemonDetails.name}</h3>
      </div>
      <Divider variant="middle" />
      <div className='pokeType'>
        {pokemonDetails && pokemonDetails.types.map((type) => (
          <Tooltip key={type.type.name} title={type.type.name} arrow>
            <div className='pokeTypeBG'>
              <PokemonTypeIcons types={[type]} />
            </div>
          </Tooltip>
        ))}
      </div>
      <div className='pokeInfo'>
        {/* Abilities: {pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')} */}
        <HeightIcon />
        <p><strong>Height: </strong>{pokemonHeight} m</p>
        <ScaleIcon />
        <p><strong>Weight: </strong> {pokemonWeight} kg</p>
      </div>
    </Card>
    </>
  );
};

export default Pokemon;