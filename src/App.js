import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Pokemon from './components/Pokemon';
import PokemonCard from './components/PokemonCard';
import { Box, Grid, Paper } from '@mui/material';
import ResponsiveAppBar from './components/Navigation';


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
      <ResponsiveAppBar/>
      <h1>Pokemon App</h1>
      
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {pokemonStateList.map((pokemonItem) => (
            <Grid item xs={2}>
              <PokemonCard key={pokemonItem.name} pokemon={pokemonItem}>
                {/* <Pokemon item={pokemonItem} /> */}
              </PokemonCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <h2>Practice Interview</h2>
      <a  href="https://icons8.com/icon/63311/pokeball">Pokeball</a> icon by <a href="https://icons8.com">Icons8</a>
    </div>
  );
}
export default App;
