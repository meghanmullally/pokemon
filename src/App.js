import './App.css';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from './components/Navigation';
import Pokedex from './components/Pokedex/Pokedex';
import Pokemon from './components/Pokemon';

function App() {

  let pokemonList = [];

  // give variable name, then set it with function..place in memory to useState to keep track of it...
  // example in Max's react course - destructoring 
  const [pokemonStateList, setPokemonStateList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState({ name: "", url: "" });

  useEffect(() => {
    // Please note that at the time of this implementation the the image url to use for the pokemon stops at 649
    const POKEMON_LIMIT = 12;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`;

    fetch(url)
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        console.log("data.results = ", data.results);
        setPokemonStateList(data.results);
      });

  }, []);

  console.log("pokemonList ", pokemonList);
  console.log("pokemonStateList ", pokemonStateList);

  const firstPokemon = {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/"
  };


  return (
   <div className="App">
      <ResponsiveAppBar />
      <h1>Pokemon App</h1>
      <Pokedex pokemonStateList={pokemonStateList} />
      <h2>Practice Interview</h2>
      <a href="https://icons8.com/icon/63311/pokeball">Pokeball</a> icon by <a href="https://icons8.com">Icons8</a>
    </div>
  ); 
}
export default App;
