import './App.css';
import { useEffect, useState } from 'react';
import Pokedex from './components/Pokedex/Pokedex';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Pokemon from './components/Pokemon';
// import ErrorPage from './components/Error';
import RootLayout from './Root';

function App() {

  // give variable name, then set it with function..place in memory to useState to keep track of it...
  // example in Max's react course - destructoring 
  const [pokemonData, setPokemonData] = useState([]);
  // help to determine if data is still being fetched or if it has loaded successfully 
  const [loading, setLoading] = useState(true);

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
        const modifiedPokemonData = data.results.map((pokemon, index) => ({
          ...pokemon,
          id: index + 1, // Add 1 to index to create a unique ID for each Pokemon
        }));
        console.log("modifiedPokemonData =", modifiedPokemonData);
        setPokemonData(modifiedPokemonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Pokemon Data', error);
        setLoading(false);
      });

  }, []);

  console.log("pokemonData ", pokemonData);

  const router = createBrowserRouter([
    { path: '/', element: !loading ? <Pokedex pokemonData={pokemonData} /> : null },
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
