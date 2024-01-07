import React, { useEffect, useState } from "react";
import { Paper } from '@mui/material';
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
            .then((Response) => Response.json())
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
                <p>evo go here</p>
            </Paper>

        </>



    )



}