import './App.css';
import { useEffect, useState } from 'react';
import Pokedex from './components/Pokedex/Pokedex';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Pokemon from './components/Pokemon';
import ErrorPage from './components/Error';
import RootLayout from './Root';

function App() {

  let pokemonList = [];

  // give variable name, then set it with function..place in memory to useState to keep track of it...
  // example in Max's react course - destructoring 
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    // the Pokémon API (PokeAPI) contains information on the first 898 Pokémon species, which includes all Pokémon from Generations I to VIII.
    const POKEMON_LIMIT = 24;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`;

    fetch(url)
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        console.log("data.results = ", data.results);
        setPokemonData(data.results);
      });

  }, []);

  console.log("pokemonData ", pokemonData);

  const router = createBrowserRouter([
        { path: '/', element: <Pokedex pokemonData={pokemonData}/> },
        { path: '/pokemon/:pokemonId', element: <Pokemon /> },
  ]);

  return (
    <div className="App">
      <RootLayout />
      <RouterProvider router={router} />
      <br/>
      <a href="https://icons8.com/icon/63311/pokeball">Pokeball</a> icon by <a href="https://icons8.com">Icons8</a>
    </div>
  );
};

export default App;
