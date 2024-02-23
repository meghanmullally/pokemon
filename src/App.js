import React, { useEffect, useState, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { pokemonActions } from './components/PokemonSlice';
import { useAppDispatch } from "./app/hooks";
import Pokedex from "./components/Pokedex/Pokedex";
import Pokemon from "./components/Pokemon/Pokemon";
import { POKEMON_LIMIT } from "./constants/pokemon";
import "./App.css";


function App() {
  
  const pokemonData ={};
  const searchOptionData = [];
  const dispatch = useAppDispatch();

  // help to determine if data is still being fetched or if it has loaded successfully
  const [loading, setLoading] = useState(true);

  // Pokemon Image
  // useMemo ensures that the function is only recreated when the inputID dependency changes.
  const generatedPokemonImageUrl = useMemo(() => (inputID) => {
    const defaultPokemonImageUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${inputID}.svg`;
    return inputID
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${inputID}.png`
      : defaultPokemonImageUrl;
  }, []);
  

  useEffect(() => {
    // the Pokémon API (PokeAPI) contains information on the first 898 Pokémon species, which includes all Pokémon from Generations I to VIII.
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`;

  // Use useMemo to memoize the initialization of memoizedPokemonData
  const memoizedPokemonData = useMemo(() => ({}), []);

  // Use useMemo to memoize the initialization of memoizedSearchOptionData
  const memoizedSearchOptionData = useMemo(() => [], []);


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

        dispatch(pokemonActions.setPokemonData(memoizedPokemonData));
        dispatch(pokemonActions.setSearchOptionData(memoizedSearchOptionData));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon Data", error);
        setLoading(false);
      });
  }, [dispatch]);

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
