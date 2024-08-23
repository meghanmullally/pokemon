import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { pokemonActions } from './components/PokemonSlice';
import { useAppDispatch } from "./app/hooks";
import Pokedex from "./components/Pokedex/Pokedex";
import Pokemon from "./components/Pokemon/Pokemon";
import { POKEMON_LIMIT } from "./constants/pokemon";
import "./App.css";

function App() {

  const pokemonData = {};
  const searchOptionData = [];
  const dispatch = useAppDispatch();
  // help to determine if data is still being fetched or if it has loaded successfully
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
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const newPokemonData = {};
        const newSearchOptionData = [];
  
        data.results.forEach((pokemon, index) => {
          let pokemonImgId = (index + 1).toString();
          const sprite = generatedPokemonImageUrl(pokemonImgId);

          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: sprite,
            searched: false
          };
          newSearchOptionData.push(newPokemonData[index + 1]);
        });

        newSearchOptionData.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          return nameA <= nameB ? -1 : 1;
        });

        dispatch(pokemonActions.setPokemonData(newPokemonData));
        dispatch(pokemonActions.setSearchOptionData(newSearchOptionData));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon Data", error);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const router = createBrowserRouter([
    { path: "/", element: !loading && <Pokedex pokemonData={pokemonData} searchOptionData={searchOptionData} /> },
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
