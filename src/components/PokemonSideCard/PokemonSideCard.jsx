import React from 'react';
import { Card, Divider, Tooltip, CardMedia } from '@mui/material';
import PokemonTypeIcons from '../TypeIcons';
import PokemonTypeNameIcons from '../TypeNameIcons';
import './PokemonSideCard.css';


const PokemonSideCard = ({ pokemonData, pokemonDetails }) => {

    console.log("------------------------------");
    console.log("side pokemon Card pokemonData", pokemonData);
    console.log("side pokemon Card pokemonDetails", pokemonDetails);

    const { sprite } = pokemonData;
    const { id, name, types } = pokemonDetails;



    return (
        <>
            <Card elevation={0} className="pokemonSideCardContainer">
                <div className="pokemonID">
                    #{String(pokemonDetails.id).padStart(3, "0")}
                </div>
                <div className="imgContainer">
                    <CardMedia
                        component="img"
                        alt="pokemon image"
                        // className="cardMedia"
                        image={
                            pokemonData && pokemonData[id - 1] && pokemonData[id - 1].sprite
                        }
                    />
                </div>
                <div className="pokemonName">
                    <h3>{name}</h3>
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
                <Divider />
                {/* pokemonSideCard End */}
            </Card>
        </>
    );


}

export default PokemonSideCard;