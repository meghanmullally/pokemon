import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { pokemonActions } from "./components/PokemonSlice";
import Pokedex from "./components/Pokedex/Pokedex";
import Pokemon from "./components/Pokemon/Pokemon";
import Regions from "./components/Regions/Regions";
import RegionDetails from "./components/RegionDetails/RegionDetails";
import LocationDetails from "./components/LocationDetails/LocationDetails";
import LocationArea from "./components/LocationArea/LocationArea";
import LoadingMessage from "./components/LoadingMessage/LoadingMessage";
import { POKEMON_LIMIT } from "./constants/pokemon";
import { generatedPokemonImageUrl } from "./utils/pokemonHelpers";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`);
        const data = await response.json();
  
        const newPokemonData = {};
        const newSearchOptionData = [];
        const BATCH_SIZE = 20;

        for (let i = 0; i < data.results.length; i += BATCH_SIZE) {
          const batch = data.results.slice(i, i + BATCH_SIZE);
          await Promise.all(
            batch.map(async (pokemon, batchIndex) => {
              const pokemonId = i + batchIndex + 1;
              const pokemonDetailsResponse = await fetch(pokemon.url);
              const pokemonDetails = await pokemonDetailsResponse.json();

              newPokemonData[pokemonId] = {
                id: pokemonId,
                name: pokemon.name,
                sprite: generatedPokemonImageUrl(pokemonId),
                types: pokemonDetails.types,
              };
              newSearchOptionData.push(newPokemonData[pokemonId]);
            })
          );
        }
  
        dispatch(pokemonActions.setPokemonData(newPokemonData));
        dispatch(pokemonActions.setSearchOptionData(
          newSearchOptionData.sort((a, b) => a.name.localeCompare(b.name))
        ));
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPokemonData();
  }, [dispatch]);

  const router = createBrowserRouter([
    { path: "/", element: !loading && <Pokedex /> },
    { path: "/pokemon/:pokemonId", element: <Pokemon /> },
    { path: "/regions", element: <Regions/> },
    { path: "/regions/:regionName", element: <RegionDetails/> },
    { path: "/locations/:locationName", element: <LocationDetails/> },
    { path: "/location-areas/:locationAreaName", element: <LocationArea /> }
  ]);

  return (
    <div className="App">
      {loading ? <LoadingMessage /> : <RouterProvider router={router} />}
    </div>
  );
}

export default App;
