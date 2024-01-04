import React from 'react';
import NormalImgName from '../img/logos/Normal_icon_Sleep.png';
import FightingImgName from '../img/logos/Fighting_icon_Sleep.png';
import FlyingImgName from '../img/logos/Flying_icon_Sleep.png';
import PoisonImgName from '../img/logos/Poison_icon_Sleep.png';
import GroundImgName from '../img/logos/Ground_icon_Sleep.png';
import RockImgName from '../img/logos/Rock_icon_Sleep.png';
import BugImgName from '../img/logos/Bug_icon_Sleep.png';
import GhostImgName from '../img/logos/Ghost_icon_Sleep.png';
import SteelImgName from '../img/logos/Steel_icon_Sleep.png';
import FireImgName from '../img/logos/Fire_icon_Sleep.png';
import WaterImgName from '../img/logos/Water_icon_Sleep.png';
import GrassImgName from '../img/logos/Grass_icon_Sleep.png';
import ElectricImgName from '../img/logos/Electric_icon_Sleep.png';
import PsychicImgName from '../img/logos/Psychic_icon_Sleep.png';
import IceImgName from '../img/logos/Ice_icon_Sleep.png';
import DragonImgName from '../img/logos/Dragon_icon_Sleep.png';
import DarkImgName from '../img/logos/Dark_icon_Sleep.png';
import FairyImgName from '../img/logos/Fairy_icon_Sleep.png';

const TypeIcons = {
  normal: NormalImgName,
  fighting: FightingImgName,
  flying: FlyingImgName,
  poison: PoisonImgName,
  ground: GroundImgName,
  rock: RockImgName,
  bug: BugImgName,
  ghost: GhostImgName,
  steel: SteelImgName,
  fire: FireImgName,
  water: WaterImgName,
  grass: GrassImgName,
  electric: ElectricImgName,
  psychic: PsychicImgName,
  ice: IceImgName,
  dragon: DragonImgName,
  dark: DarkImgName,
  fairy: FairyImgName,
};


const getTypeIconUrl = (typeName) => {
  return TypeIcons[typeName.toLowerCase()] || null;
};


const PokemonTypeIcons = ({ types }) => {

 // Check if types is defined and is an array
 if (!Array.isArray(types) || types.length === 0) {
  return null; // or handle it according to your requirements
}

  return (
    <div>
      {types.map((typeInfo, typeIndex) => {
        return (
          // typeInfo is used to represent an individual type object
          // typeIndex is used to represent the index of that type in the types array. 
          <img
            key={typeIndex}
            src={getTypeIconUrl(typeInfo.type.name)}
            alt={typeInfo.type.name}
            style={{ width: '50px', height: '50px'}}
          />
        )
      }

      )}
    </div>
  );
};

export default PokemonTypeIcons;
