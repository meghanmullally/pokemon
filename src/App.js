import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { pokemonActions } from './components/PokemonSlice';
import { useAppDispatch } from "./app/hooks";
import Pokedex from "./components/Pokedex/Pokedex";
import Pokemon from "./components/Pokemon/Pokemon";
import { POKEMON_LIMIT } from "./constants/pokemon";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  // Pokemon Image
  const generatedPokemonImageUrl = (inputId) => {

    let url = "";

    if (parseInt(inputId) <= 649) {
      // this source only goes up to 649 pokemon when this project was implemented 
      url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${inputId}.svg`;
    } else {
      // this source goes up to 1010 pokemon when this project was implemented 
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${inputId}.png`;
    }

    return url;
  };

  useEffect(() => {
    // Fetch basic data for all Pokémon
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`;

    fetch(url)
      .then((response) => response.json())
      .then(async (data) => {
        const newPokemonData = {};
        const newSearchOptionData = [];

        // Use `Promise.all` to fetch detailed data for each Pokémon
        await Promise.all(
          data.results.map(async (pokemon, index) => {
            const pokemonId = index + 1;
            const pokemonDetailsUrl = pokemon.url;  // URL to fetch each Pokémon's details

            // Fetch detailed data for each Pokémon to get types and other details
            const pokemonDetailsResponse = await fetch(pokemonDetailsUrl);
            const pokemonDetails = await pokemonDetailsResponse.json();

            const sprite = generatedPokemonImageUrl(pokemonId);

            newPokemonData[pokemonId] = {
              id: pokemonId,
              name: pokemon.name,
              sprite: sprite,
              types: pokemonDetails.types,
              searched: false
            };

            newSearchOptionData.push(newPokemonData[pokemonId]);
          })
        );

        // Sort search options alphabetically
        newSearchOptionData.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          return nameA <= nameB ? -1 : 1;
        });

        // Dispatch data to Redux store
        dispatch(pokemonActions.setPokemonData(newPokemonData));
        dispatch(pokemonActions.setSearchOptionData(newSearchOptionData));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon Data", error);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const router = createBrowserRouter([
    { path: "/", element: !loading && <Pokedex /> },
    { path: "/pokemon/:pokemonId", element: <Pokemon /> },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <br />
    </div>
  );
}

export default App;