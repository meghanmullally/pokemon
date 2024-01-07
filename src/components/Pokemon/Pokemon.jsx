import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Card, Divider, Tooltip } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import PokemonTypeIcons from '../TypeIcons';
import Bio from '../Bio/Bio';
import Stats from '../Stats/Stats';
import './Pokemon.css';
// import ErrorPage from './Error';


const Pokemon = ({ pokemonData }) => {

  // specific pokemon details
  const [pokemonDetails, setPokemonDetails] = useState(null);
  // for pokemon Evo
  const [pokemonSpecies, setPokemonSpecies] = useState(null);

  console.log('pokemonDetails:', pokemonDetails);


  const params = useParams();
  console.log("params = ", params)
  let { pokemonId } = params;


  useEffect(() => {
    // pokemonUrl can take pokemon name or id, using name since that is what comes back in the fetch in app.js
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    // url for Evo 
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;

    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('In Pokemon - pokemonDetails = ', data);
        setPokemonDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching Pokemon data:', error);
        // Handle the error, show an error message, or redirect to an error page
      });

    fetch(speciesUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("In Pokemon - EVO data = ", data);
        setPokemonSpecies(data);
      })
      .catch((error) => {
        console.error('Error fetching Pokemon species data:', error);
        // Handle the error, show an error message, or redirect to an error page
      });

  }, [pokemonId]);

  console.log("------------------------------");
  console.log('In Pokemon - pokemon details, pokemon species');
  console.log('pokemonDetails =', pokemonDetails);
  console.log('pokemonSpecies =', pokemonSpecies);


  // checking for both pokemonDetails and pokemonSpecies
  if (!pokemonDetails || !pokemonSpecies) {
    console.log('No pokemonDetails or pokemonSpecies found');
    return null; // or some loading indicator
  }


  console.log("-------------------------------")
  console.log("Im in the pokemon function");
  console.log("pokemonDetails=", pokemonDetails);
  console.log('pokemonData:', pokemonData);

  return (
    <>
      <div className='pokemonContainer'>
        <Card className='pokemonCardContainer'>
          <div className="pokemonSideCard">
            <div className='pokemonID'>
              #{String(pokemonDetails.id).padStart(3, '0')}
            </div>
            <div className='imgContainer'>
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
            <div className='pokeType'>
              {pokemonDetails && pokemonDetails.types.map((type) => (
                <Tooltip key={type.type.name} title={type.type.name} arrow>
                  <div className='pokeTypeBG'>
                    <PokemonTypeIcons types={[type]} />
                  </div>
                </Tooltip>
              ))}
            </div>
            <Divider />
            <div className='statsInfo'>
              <Stats pokemonDetails={pokemonDetails} />
            </div>
          </div> {/* pokemonSideCard End */}
        </Card>
        <div className='detailContainer'>
          <Bio pokemonDetails={pokemonDetails} pokemonSpecies={pokemonSpecies} />
        </div>
      </div> {/* full pokemon detail div  */}
    </>
  );
};

export default Pokemon;