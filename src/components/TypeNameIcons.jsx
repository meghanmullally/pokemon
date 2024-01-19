import React from 'react';
import NormalImg from '../img/name_icons/NormalIC_BDSP.png';
import FightingImg from '../img/name_icons/FightingIC_BDSP.png';
import FlyingImg from '../img/name_icons/FlyingIC_BDSP.png';
import PoisonImg from '../img/name_icons/PoisonIC_BDSP.png';
import GroundImg from '../img/name_icons/GroundIC_BDSP.png';
import RockImg from '../img/name_icons/RockIC_BDSP.png';
import BugImg from '../img/name_icons/BugIC_BDSP.png';
import GhostImg from '../img/name_icons/GhostIC_BDSP.png';
import SteelImg from '../img/name_icons/SteelIC_BDSP.png';
import FireImg from '../img/name_icons/FireIC_BDSP.png';
import WaterImg from '../img/name_icons/WaterIC_BDSP.png';
import GrassImg from '../img/name_icons/GrassIC_BDSP.png';
import ElectricImg from '../img/name_icons/ElectricIC_BDSP.png';
import PsychicImg from '../img/name_icons/PsychicIC_BDSP.png';
import IceImg from '../img/name_icons/IceIC_BDSP.png';
import DragonImg from '../img/name_icons/DragonIC_BDSP.png';
import DarkImg from '../img/name_icons/DarkIC_BDSP.png';
import FairyImg from '../img/name_icons/FairyIC_BDSP.png';

const TypeNameIcons = {
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


const getTypeNameIconUrl = (typeName) => {
  return TypeNameIcons[typeName.toLowerCase()] || null;
};


const PokemonTypeNameIcons = ({ types }) => {

  return (
    <div>
      {types.map((typeInfo, typeIndex) => {
        return (
          // typeInfo is used to represent an individual type object
          // typeIndex is used to represent the index of that type in the types array. 
          <img
            key={typeIndex}
            src={getTypeNameIconUrl(typeInfo.type.name)}
            alt={typeInfo.type.name}
            style={{ width: 'auto', height: 'auto'}}
          />
        )
      }

      )}
    </div>
  );
};

export default PokemonTypeNameIcons;
