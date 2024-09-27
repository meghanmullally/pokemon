import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Divider, Box } from '@mui/material';
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
      evolutionDetails: chain.evolution_details
    };

    // Adding the evolved Pokemon to the 'evolutionList' array
    evolutionList.push(pokemonEvolved);

    // Iterate over all possible evolutions
    if (chain.evolves_to.length !== 0) {
      chain.evolves_to.forEach(nextEvolution => {
        buildEvolution(nextEvolution, evolutionList);
      });
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
      .then((response) => {
        if (!response.ok) {
          console.warn(`Characteristic not found for Pokémon with ID ${pokemonId}`);
          setCharacteristicDetails(null);  // Safely set to null
          return null;  // Exit early if no characteristic data
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.descriptions) {
          const englishDescription = data.descriptions.find(
            (desc) => desc.language.name === 'en'
          );
          const characteristicDescription = englishDescription
            ? englishDescription.description
            : 'No characteristic description available';
    
          setCharacteristicDetails({ ...data, characteristicDescription });
        } else {
          console.warn('No characteristic descriptions available.');
          // Safely set to null if descriptions don't exist
          setCharacteristicDetails(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching characteristic data:", error);
        setCharacteristicDetails(null);  // Set to null in case of an error
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
    // ?. optional chaining ensures if null / undefined code wont throw error & will go to next condition
    if (types?.length === 2) {
      // Extract the colors for both types using map
      const [firstType, secondType] = types.map(t => TYPE_COLORS[t.type.name] || "white");

      // Return a linear gradient combining both colors
      return `linear-gradient(to bottom, ${firstType} 15%, ${secondType} 75%)`;
    } else if (types?.length === 1) {
      // If there's only one type, return its corresponding color
      return TYPE_COLORS[types[0].type.name] || "white";
    }

    // If types is undefined or an empty array, return a default color (white)
    return "white";
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