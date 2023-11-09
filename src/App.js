import './App.css';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from './components/Navigation';
import Pokedex from './components/Pokedex/Pokedex';
import PokemonHeaderImg from './img/pokedex_logo.svg';

function App() {

  let pokemonList = [];

  // give variable name, then set it with function..place in memory to useState to keep track of it...
  // example in Max's react course - destructoring 
  const [pokemonStateList, setPokemonStateList] = useState([]);
  // const [currentPokemon, setCurrentPokemon] = useState({ name: "", url: "" });

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
        setPokemonStateList(data.results);
      });

  }, []);

  console.log("pokemonList ", pokemonList);
  console.log("pokemonStateList ", pokemonStateList);


  return (
    <div className="App">
      <ResponsiveAppBar />
      <img src={PokemonHeaderImg} alt="Pokemon Header" style={{ height: '100px', width: '200px' }} />
      <Pokedex pokemonStateList={pokemonStateList} />
      <a href="https://icons8.com/icon/63311/pokeball">Pokeball</a> icon by <a href="https://icons8.com">Icons8</a>
    </div>
  );
}
export default App;
