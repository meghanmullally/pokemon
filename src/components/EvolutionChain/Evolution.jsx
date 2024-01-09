import React, { useEffect, useState } from "react";
import { Paper, Typography } from '@mui/material';
import PokemonCard from '../PokemonCard/PokemonCard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { POKEMON_LIMIT } from '../../constants/pokemon';
import './Evolution.css';


export default function Evolution({ pokemonSpecies }) {

    const { id } = pokemonSpecies
    const [evolutionDetails, setEvolutionDetails] = useState(null);

    console.log('--------------------------------');
    console.log('IN EVOLUTION COMP');
    console.log('pokemonSpecies', pokemonSpecies);

    useEffect(() => {

        const evolutionChainUrl = `https://pokeapi.co/api/v2/evolution-chain/${id}/`;
        fetch(evolutionChainUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log("IN EVO - evo data", data);
                setEvolutionDetails(data);
            })
            .catch((error) => {
                console.error('Error fetching Evo Data:', error);
            });

    }, [])
    // end of useEffect

    console.log("EvoDetails", evolutionDetails);

    // checking for evolutionDetails
    if (!evolutionDetails) {
        console.log('No evolutionDetails found');
        return null; // or some loading indicator
    }


    return (

        <>
            <Paper>
                <Typography variant="h3">Evolution Chain</Typography>
                <div className="evoContainer">
                    <div className="evoPoke">

                        <div className='evoArrow'>
                            <KeyboardArrowRightIcon />
                        </div>
                        <div className='evoLevel'>
                            {/* min level of evolution detail */}
                            Level {evolutionDetails.chain.evolves_to[0].evolution_details[0].min_level}
                        </div>

                    </div>
                </div>
            </Paper>

        </>



    )



}