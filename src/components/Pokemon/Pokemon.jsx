import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Divider, Paper, Box } from '@mui/material';
import PokemonSideCard from '../PokemonSideCard/PokemonSideCard';
import Bio from '../Bio/Bio';
import Stats from '../Stats/Stats';
import Evolution from '../EvolutionChain/Evolution';
import Moves from '../Moves/Moves';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import Header from '../Header/Header';
import { POKEMON_LIMIT, TYPE_COLORS } from '../../constants/pokemon';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { pokemonActions } from '../PokemonSlice';
import './Pokemon.css';


const Pokemon = () => {
  const dispatch = useAppDispatch();
  const pokemonData = useAppSelector(state => state.pokemon.pokemonData);

  const params = useParams();
  let { pokemonId } = params;


  const navigate = useNavigate();

  if (parseInt(pokemonId) > POKEMON_LIMIT) {
    navigate(`/`);

    pokemonId = '1';
  }

  // initial evo chain
  const initEvolutionChain = [];
  const initDetails = [];
  const initSpecies = [];
  const initCharacteristic = [];

  // Main Pokemon Details
  const [pokemonDetails, setPokemonDetails] = useState(initDetails);
  // Pokemon Evolution Chain
  const [evolutionChain, setEvolutionChain] = useState(initEvolutionChain);
  // Pokemon Species Details for Bio - stored in comp state
  const [pokemonSpecies, setPokemonSpecies] = useState(initSpecies);
  const [characteristicDetails, setCharacteristicDetails] = useState(initCharacteristic);

  // const evolutionList = [];

  // Evolution Chain Recursive function
  const buildEvolution = useCallback((chain, evolutionList = []) => {

    // Destructuring assignment: Extracts the 'name' and 'url' properties from 'chain.species'
    const { name, url } = chain.species;

    // Regular expression to match and extract the numeric part from the 'url'
    const regex = /\/(\d+)\/?/;
    const check = url.match(regex);

    // Creating an object representing the evolved Pokemon with 'id' and 'name'
    const pokemonEvolved = {
      id: check[1],
      name: name,
    };

    // Adding the evolved Pokemon to the 'evolutionList' array
    evolutionList.push(pokemonEvolved);

    // Checking if there are further evolutions in the chain
    if (chain.evolves_to.length !== 0) {
      // If true, make a recursive call to 'buildEvolution' with the next evolution and the updated 'evolutionList'
      return buildEvolution(chain.evolves_to[0], evolutionList);
    }

    // If no further evolutions, return the final 'evolutionList'
    return evolutionList;
  }, []);

  useEffect(() => {
    // pokemonUrl can take pokemon name or id, using name since that is what comes back in the fetch in app.js
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    // url for specific pokemon details
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
    // url for pokemon characteristic 
    const characteristicUrl = `https://pokeapi.co/api/v2/characteristic/${pokemonId}/`;


    // update history
    if (Object.keys(pokemonData).length !== 0) {
      const findPokemon = pokemonData[pokemonId];

      const pokemonFound = {
        searched: true,
        ...findPokemon
      };

      if (findPokemon) {
        pokemonFound.searched = true;
        dispatch(pokemonActions.updateHistory(pokemonFound));
      }
    }

    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((data) => {
        setPokemonDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon data:", error);
        // Handle the error, show an error message, or redirect to an error page
      });

    fetch(characteristicUrl)
      .then((response) => response.json())
      .then((data) => {
        // Finding the English description
        const englishDescription = data.descriptions.find((desc) => desc.language.name === 'en');
        const characteristicDescription = englishDescription ? englishDescription.description : '';

        // Set state with the data including the English description
        setCharacteristicDetails({ ...data, characteristicDescription });
      })
      .catch((error) => {
        console.error("Error fetching characteristic data:", error);
        // Handle the error, show an error message, or redirect to an error page
      });

    fetch(speciesUrl)
      .then((response) => response.json())
      .then((data) => {
        setPokemonSpecies(data);

        fetch(data.evolution_chain.url)
          .then((response) => response.json())
          .then((data) => {
            const { chain } = data;

            const evolutionList = buildEvolution(chain);
            setEvolutionChain(evolutionList);
          })
          .catch((error) => {
            console.error("Error fetching Evo Data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching Pokemon species data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonId, buildEvolution, dispatch, pokemonData]);

  // Type Colors and Card Background Color
  const getBorderColor = (types) => {
    if (types && types.length === 2) {
      const firstType = types[0].type.name;
      const secondType = types[1].type.name;
      let color1 = TYPE_COLORS[firstType] || "white"; // Default to white if color is not found
      let color2 = TYPE_COLORS[secondType] || "white";
      return `linear-gradient(to bottom, ${color1} 15%, ${color2} 75%)`;
      // Add 80 (hexadecimal for 128, which is 50% opacity) to the color
    } else if (types && types.length === 1) {
      const singleType = types[0].type.name;
      const color = TYPE_COLORS[singleType] || "white";
      return color;
    } else {
      // Handle the case when types is undefined or an empty array
      return "white30"; // You can provide a default color or handle it as needed
    }
  };

  // build bio
  const bioBuild = () => (
    <>
      <Box
        style={{
          margin: "2rem",
          paddingTop: "1rem",
          borderWidth: "10px",
          background: `${getBorderColor(pokemonDetails.types)}`,
          borderRadius: "1rem",
        }}
      >
        <div className="pokemonContainer">
            <div className="statsTypeInfo">
              <PokemonSideCard
                pokemonDetails={pokemonDetails}
                pokemonData={pokemonData[pokemonDetails.id]}
              />
              <Divider />
              <Stats pokemonDetails={pokemonDetails} />
            </div>
            <div className="bioContainer">
              <Bio
                pokemonDetails={pokemonDetails}
                pokemonSpecies={pokemonSpecies}
                characteristicDetails={characteristicDetails}
              />
            </div>
        </div>
        <div className="evoMoveContainer">
        <Evolution evolutionData={evolutionChain} />
        <Moves pokemonDetails={pokemonDetails} />
        </div>
      </Box>
    </>
  );

  return (
    <>
      <React.Fragment>
        <Header />
        {!pokemonDetails || !pokemonSpecies || evolutionChain.length === 0 ? (
          <LoadingMessage />
        ) : (
          bioBuild()
        )}
      </React.Fragment>
    </>
  );
};

export default Pokemon;