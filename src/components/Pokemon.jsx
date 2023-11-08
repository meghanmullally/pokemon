import React from "react";
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';



const Pokemon = ({ pokemonData }) => {

  let pokemonHeight = null;
  let pokemonWeight = null;

  if (pokemonData) {
    // The pokemon's height in decimetres which is converted into metres by dividing by 10
    pokemonHeight = (pokemonData.height / 10);
    // The pokemon's weight in hectograms which is converted into kilograms by dividing by 10
    pokemonWeight = (pokemonData.weight / 10);
  }

  console.log("Im in the pokemon function");
  console.log("pokemonData", pokemonData);
  return (
    <>
      {pokemonData && (
        <div>
          <div>{pokemonData.name}</div>
          <HeightIcon />
          <p>{pokemonHeight} m</p>
          <ScaleIcon />
          <p>{pokemonWeight} kg</p>
        </div>
      )}
    </>
  );
};

export default Pokemon;