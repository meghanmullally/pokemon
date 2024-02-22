import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { pokemonActions } from './components/PokemonSlice';
import { useAppDispatch } from "./app/hooks";
import Pokedex from "./components/Pokedex/Pokedex";
import Pokemon from "./components/Pokemon/Pokemon";
// import { POKEMON_LIMIT } from "./constants/pokemon";
import "./App.css";


function App() {
  
  const pokemonData ={};
  const searchOptionData = [];
  const dispatch = useAppDispatch();

  // help to determine if data is still being fetched or if it has loaded successfully
  const [loading, setLoading] = useState(true);

  // Pokemon Image
  const generatedPokemonImageUrl = (id) => {
    const defaultPokemonImageUrl = "src/img/default_pokemon.png";
    return id
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      : defaultPokemonImageUrl;
  };

  useEffect(() => {
    // the Pokémon API (PokeAPI) contains information on the first 898 Pokémon species, which includes all Pokémon from Generations I to VIII.
    const POKEMON_LIMIT = 50;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        data.results.forEach((pokemon, index) => {
          let pokemonImgId = (index + 1).toString();
          const sprite = generatedPokemonImageUrl(pokemonImgId);

          pokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: sprite,
            searched: false
          };
          searchOptionData.push(pokemonData[index + 1]);
        });

        searchOptionData.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          return nameA <= nameB ? -1 : 1;
      });

        dispatch(pokemonActions.setPokemonData(pokemonData));
        dispatch(pokemonActions.setSearchOptionData(searchOptionData));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon Data", error);
        setLoading(false);
      });
  }, [pokemonData, searchOptionData]);

  const router = createBrowserRouter([
    { path: "/", element: !loading && <Pokedex pokemonData={pokemonData} searchOptionData={searchOptionData}/> },
    { path: "/pokemon/:pokemonId", element: <Pokemon /> },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <br />
      {/* <a href="https://icons8.com/icon/63311/pokeball">Pokeball</a> icon by <a href="https://icons8.com">Icons8</a> */}
    </div>
  );
};

export default App;
