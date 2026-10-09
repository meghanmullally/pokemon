import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './LocationDetails.css';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import PokemonCard from '../PokemonCard/PokemonCard';
import { POKEMON_LIMIT } from '../../constants/pokemon';

export default function LocationDetails() {

    const { locationName } = useParams(); // e.g. "celadon-city" from the URL

    const [displayName, setDisplayName] = useState('');
    const [pokemonEncounters, setPokemonEncounters] = useState([]);

    useEffect(() => {
        async function getLocationDetails() {
            try {
                // Step 1: fetch the location to get its English name and list of areas
                const locationRes = await fetch(`https://pokeapi.co/api/v2/location/${locationName}/`);
                const locationData = await locationRes.json();

                // Get the English display name, fallback to the URL slug
                const englishName = locationData.names?.find(n => n.language?.name === 'en')?.name || locationName;
                setDisplayName(englishName);

                // Step 2: fetch all areas in parallel so we don't need a separate click
                const areaResponses = await Promise.all(
                    locationData.areas.map(area => fetch(area.url).then(r => r.json()))
                );

                // Step 3: combine pokemon_encounters from all areas and dedupe by name
                const allEncounters = [];
                const seen = new Set();
                areaResponses.forEach(area => {
                    area.pokemon_encounters?.forEach(encounter => {
                        // Only add each Pokemon once even if it appears in multiple areas
                        if (!seen.has(encounter.pokemon.name)) {
                            seen.add(encounter.pokemon.name);
                            allEncounters.push(encounter);
                        }
                    });
                });

                setPokemonEncounters(allEncounters);
            } catch(error) {
                console.error("Error fetching location details:", error);
            }
        }

        getLocationDetails();
    }, [locationName]); // re-runs when the location in the URL changes

    // Extract the numeric Pokemon ID from its API URL
    // e.g. "https://pokeapi.co/api/v2/pokemon/54/" -> "54"
    const getId = (url) => url.match(/\/(\d+)\/?$/)?.[1];

    // Filter out forms/variants above our limit since they don't have images
    const filteredEncounters = pokemonEncounters.filter(
        e => parseInt(getId(e.pokemon.url)) <= POKEMON_LIMIT
    );

    return (
        <React.Fragment>
            <Header />
            <h1 className="locationDetailsTitle">{displayName}</h1>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                className="locationPokemonContainer"
            >
                {filteredEncounters.map((encounter) => {
                    const pokemonId = getId(encounter.pokemon.url);
                    return (
                        // Reuse the same PokemonCard from the Pokedex
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={2} key={encounter.pokemon.name}>
                            <PokemonCard pokemonId={pokemonId} />
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
}
