import React from 'react';
import NormalImg from '../img/logos/Normal_icon_Sleep.png';
import FightingImg from '../img/logos/Fighting_icon_Sleep.png';
import FlyingImg from '../img/logos/Flying_icon_Sleep.png';
import PoisonImg from '../img/logos/Poison_icon_Sleep.png';
import GroundImg from '../img/logos/Ground_icon_Sleep.png';
import RockImg from '../img/logos/Rock_icon_Sleep.png';
import BugImg from '../img/logos/Bug_icon_Sleep.png';
import GhostImg from '../img/logos/Ghost_icon_Sleep.png';
import SteelImg from '../img/logos/Steel_icon_Sleep.png';
import FireImg from '../img/logos/Fire_icon_Sleep.png';
import WaterImg from '../img/logos/Water_icon_Sleep.png';
import GrassImg from '../img/logos/Grass_icon_Sleep.png';
import ElectricImg from '../img/logos/Electric_icon_Sleep.png';
import PsychicImg from '../img/logos/Psychic_icon_Sleep.png';
import IceImg from '../img/logos/Ice_icon_Sleep.png';
import DragonImg from '../img/logos/Dragon_icon_Sleep.png';
import DarkImg from '../img/logos/Dark_icon_Sleep.png';
import FairyImg from '../img/logos/Fairy_icon_Sleep.png';

const TypeIcons = {
  normal: NormalImg,
  fighting: FightingImg,
  flying: FlyingImg,
  poison: PoisonImg,
  ground: GroundImg,
  rock: RockImg,
  bug: BugImg,
  ghost: GhostImg,
  steel: SteelImg,
  fire: FireImg,
  water: WaterImg,
  grass: GrassImg,
  electric: ElectricImg,
  psychic: PsychicImg,
  ice: IceImg,
  dragon: DragonImg,
  dark: DarkImg,
  fairy: FairyImg,
};


const getTypeIconUrl = (typeName) => {
  return TypeIcons[typeName.toLowerCase()] || null;
};


const PokemonTypeIcons = ({ types }) => {

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
