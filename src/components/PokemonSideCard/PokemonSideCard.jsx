import React from 'react';
import { Card, Tooltip, CardMedia } from '@mui/material';
// import PokemonTypeIcons from '../TypeIcons';
import PokemonTypeNameIcons from '../TypeNameIcons';
import './PokemonSideCard.css';


const PokemonSideCard = ({pokemonDetails }) => {
    const { name, types, sprites } = pokemonDetails;


    return (
        <>
            <Card elevation={0} className="pokemonSideCardContainer">
                <div className="pokemonID">
                    #{String(pokemonDetails.id).padStart(3, "0")} {name}
                </div>
                {/* <div className="pokemonName">
                    <h3>{name}</h3>
                </div> */}
                <div className="imgContainer">
                    <CardMedia
                        component="img"
                        alt={`${name} pokemon image`}
                        image={sprites.front_default}
                    />
                </div>
                <div className="pokeType">
                    {types &&
                        types.map((type) => (
                            <Tooltip key={type.type.name} title={type.type.name} arrow>
                                <div className="pokeTypeBG">
                                    <PokemonTypeNameIcons types={[type]} />
                                </div>
                            </Tooltip>
                        ))}
                </div>
                {/* pokemonSideCard End */}
            </Card>
        </>
    );


}

export default PokemonSideCard;