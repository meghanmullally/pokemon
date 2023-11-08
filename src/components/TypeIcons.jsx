import React from 'react';

const TypeIcons = {
  normal: '../img/type_icons/Normal_icon_Sleep.png',
  fighting: '../img/type_icons/Fighting_icon_Sleep.png',
  flying: '../img/type_icons/Flying_icon_Sleep.png',
  poison: '../img/type_icons/Poison_icon_Sleep.png',
  ground: '../img/type_icons/Ground_icon_Sleep.png',
  rock: '../img/type_icons/Rock_icon_Sleep.png',
  bug: '../img/type_icons/Bug_icon_Sleep.png',
  ghost: '../img/type_icons/Ghost_icon_Sleep.png',
  steel: '../img/type_icons/Steel_icon_Sleep.png',
  fire: '../img/type_icons/Fire_icon_Sleep.png',
  water: '../img/type_icons/Water_icon_Sleep.png',
  grass: '../img/type_icons/Grass_icon_Sleep.png',
  electric: '../img/type_icons/Electric_icon_Sleep.png',
  psychic: '../img/type_icons/Psychic_icon_Sleep.png',
  ice: '../img/type_icons/Ice_icon_Sleep.png',
  dragon: '../img/type_icons/Dragon_icon_Sleep.png',
  dark: '../img/type_icons/Dark_icon_Sleep.png',
  fairy: '../img/type_icons/Fairy_icon_Sleep.png'
};

// const typeMapping = {
//   1: "normal",
//   2: "fighting",
//   3: "flying",
//   4: "poison",
//   5: "ground",
//   6: "rock",
//   7: "bug",
//   8: "ghost",
//   9: "steel",
//   10: "fire",
//   11: "water",
//   12: "grass",
//   13: "electric",
//   14: "psychic",
//   15: "ice",
//   16: "dragon",
//   17: "dark",
//   18: "fairy",
// };


const getTypeIconUrl = (typeName) => {
  return TypeIcons[typeName.toLowerCase()] || null;
};

const PokemonTypeIcons = ({ types }) => {

  // console.log("pokemonTypes", types)
  return (
    <div>
      {types.map((type, index) => (
        <img
          key={index}
          src={getTypeIconUrl(type.type.name)}
          alt={type.type.name}
        />
      ))}
    </div>
  );
};

export default PokemonTypeIcons;
