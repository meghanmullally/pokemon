import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Pokemon from './components/Pokemon';

function App() {

let pokemonList = [];

// give variable name, then set it with function..place in memory to useState to keep track of it...
// example in Max's react course - destructoring 
const [pokemonStateList, setPokemonStateList] = useState([]);
const [currentPokemon, setCurrentPokemon] = useState({ name: "", url: "" });

  useEffect(() => {
    // Please note that at the time of this implementation the the image url to use for the pokemon stops at 649
    const POKEMON_LIMIT = 10;
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
      <h1>POKEMON APP</h1>

      {pokemonStateList.map((pokemonItem) => 
      
      (<Pokemon key={pokemonItem.name} item={pokemonItem}  />

      ))}
      <h2>Practice Interview</h2>
    </div>
  );
}
export default App;
