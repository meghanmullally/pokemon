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
import { Button } from '@mui/material';
import { POKEMON_LIMIT, TYPE_COLORS } from '../../constants/pokemon';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { pokemonActions } from '../PokemonSlice';
import './Pokemon.css';


const Pokemon = () => {
  const dispatch = useAppDispatch();
  const pokemonData = useAppSelector(state => state.pokemon.pokemonData);

  const params = useParams();
  const { pokemonId } = params;

  const navigate = useNavigate();

  useEffect(() => {
    if (parseInt(pokemonId) > POKEMON_LIMIT) {
      navigate('/');
    }
  }, [pokemonId, navigate]);

  const initDetails = [];
  const initSpecies = [];
  const initCharacteristic = [];

  // Main Pokemon Details
  const [pokemonDetails, setPokemonDetails] = useState(initDetails);
  // Pokemon Evolution Chain — now a tree object, null = not loaded yet
  const [evolutionChain, setEvolutionChain] = useState(null);
  // Pokemon Species Details for Bio - stored in comp state
  const [pokemonSpecies, setPokemonSpecies] = useState(initSpecies);
  const [characteristicDetails, setCharacteristicDetails] = useState(initCharacteristic);
  const [fetchError, setFetchError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Build evolution tree preserving branches
  const buildEvolution = useCallback((chain) => {
    const { name, url } = chain.species;
    const regex = /\/(\d+)\/?/;
    const check = url.match(regex);

    return {
      id: check[1],
      name,
      evolutionDetails: chain.evolution_details,
      evolvesTo: chain.evolves_to.map(next => buildEvolution(next)),
    };
  }, []);

  useEffect(() => {
    // pokemonUrl can take pokemon name or id, using name since that is what comes back in the fetch in app.js
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
    const characteristicUrl = `https://pokeapi.co/api/v2/characteristic/${pokemonId}/`;

    // Reset state for the new Pokemon
    setPokemonDetails(initDetails);
    setEvolutionChain(null);
    setPokemonSpecies(initSpecies);
    setCharacteristicDetails(initCharacteristic);
    setFetchError(false);

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
      .then((response) => {
        if (!response.ok) throw new Error(`Pokemon fetch failed: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setPokemonDetails(data);

        // Dispatch action to update Redux store with detailed data including `types`
        dispatch(pokemonActions.updatePokemonDetails({
          id: pokemonId,
          details: {
            types: data.types,
            name: data.name,
          }
        }));
      })
      .catch((error) => {
        console.error("Error fetching Pokemon data:", error);
        setFetchError(true);
      });

    fetch(characteristicUrl)
      .then((response) => {
        if (!response.ok) {
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
          setCharacteristicDetails(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching characteristic data:", error);
        setCharacteristicDetails(null);
      });

    fetch(speciesUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Species fetch failed: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setPokemonSpecies(data);

        if (data.evolution_chain?.url) {
          fetch(data.evolution_chain.url)
            .then((response) => response.json())
            .then((data) => {
              setEvolutionChain(buildEvolution(data.chain));
            })
            .catch((error) => {
              console.error("Error fetching Evo Data:", error);
              setEvolutionChain({});
            });
        } else {
          setEvolutionChain({});
        }
      })
      .catch((error) => {
        console.error("Error fetching Pokemon species data:", error);
        setEvolutionChain({});
        setFetchError(true);
      });
  }, [buildEvolution, dispatch, pokemonId, retryCount]); // eslint-disable-line react-hooks/exhaustive-deps

  // Type Colors and Card Background Color
  const getBorderColor = (types) => {
    if (types?.length === 2) {
      const [firstType, secondType] = types.map(t => TYPE_COLORS[t.type.name] || "white");
      return `linear-gradient(to bottom, ${firstType} 20%, rgba(255, 255, 255, 0.2) 50%, ${secondType} 80%)`;
    } else if (types?.length === 1) {
      const primaryType = TYPE_COLORS[types[0].type.name] || "white";
      return primaryType;
    }
    return "white";
  };

  // build bio
  const bioBuild = () => (
    <>
      <Box
        sx={{
          margin: { xs: "0.5rem", sm: "1rem", md: "2rem" },
          paddingTop: "1rem",
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
        {fetchError ? (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Failed to load Pokémon data.</p>
            <Button variant="contained" onClick={() => { setFetchError(false); setEvolutionChain(null); setRetryCount(c => c + 1); }}>
              Retry
            </Button>
            <Button variant="text" onClick={() => navigate('/')} sx={{ ml: 1 }}>
              Back to Pokédex
            </Button>
          </div>
        ) : evolutionChain === null || !pokemonDetails.id || !pokemonSpecies.id ? (
          <LoadingMessage />
        ) : (
          bioBuild()
        )}
      </React.Fragment>
    </>
  );
};

export default Pokemon;