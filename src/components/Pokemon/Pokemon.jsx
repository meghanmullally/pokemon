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
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
    const characteristicUrl = `https://pokeapi.co/api/v2/characteristic/${pokemonId}/`;

    // Update search history in Redux if pokemonData is loaded
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

        // Dispatch action to update Redux store with detailed data including `types`
        dispatch(pokemonActions.updatePokemonDetails({
          id: pokemonId,
          details: {
            types: data.types, // Add types to the redux store
            sprite: data.sprites.other['official-artwork'].front_default,
            name: data.name,
          }
        }));
      })
      .catch((error) => {
        console.error("Error fetching Pokemon data:", error);
      });

    fetch(characteristicUrl)
      .then((response) => {
        if (!response.ok) {
          console.warn(`Characteristic not found for Pokémon with ID ${pokemonId}`);
          setCharacteristicDetails(null);
          return null;
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
          setCharacteristicDetails(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching characteristic data:", error);
        setCharacteristicDetails(null);
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
  }, [buildEvolution, dispatch, pokemonData, pokemonId]);

  // Type Colors and Card Background Color
  const getBorderColor = (types) => {
    if (types?.length === 2) {
      const [firstType, secondType] = types.map(t => TYPE_COLORS[t.type.name] || "white");
  
      // Create a smoother blend between two colors with a hint of white in the middle
      return `linear-gradient(to bottom, ${firstType} 20%, rgba(255, 255, 255, 0.6) 50%, ${secondType} 80%)`;
    } else if (types?.length === 1) {
      const primaryType = TYPE_COLORS[types[0].type.name] || "white";
  
      // Use only the single type color with no blending
      return primaryType;
    }
  
    // Default for no types
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
          <Moves moves={pokemonDetails.moves} />
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