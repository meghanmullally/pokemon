import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { pokemonActions } from "./components/PokemonSlice";
import Pokedex from "./components/Pokedex/Pokedex";
import Pokemon from "./components/Pokemon/Pokemon";
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
  
        await Promise.all(
          data.results.map(async (pokemon, index) => {
            const pokemonId = index + 1;
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
  
        dispatch(pokemonActions.setPokemonData(newPokemonData));
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
  ]);

  return (
    <div className="App">
          {loading ? <p>Loading Pokémon...</p> : <RouterProvider router={router} />}
    </div>
  );
}

export default App;