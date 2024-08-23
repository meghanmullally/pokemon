import React from 'react';
import { Card, Tooltip, CardMedia } from '@mui/material';
import PokemonTypeNameIcons from '../Type/TypeNameIcons';
import './PokemonSideCard.css';


const PokemonSideCard = ({ pokemonDetails }) => {
    const { name, types, sprites } = pokemonDetails;

    return (
        <>
            <Card elevation={0} className="pokemonSideCardContainer">
                <div className="pokemonID">
                    #{pokemonDetails.id} {name}
                </div>
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