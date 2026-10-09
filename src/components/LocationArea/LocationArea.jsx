import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import PokemonCard from "../PokemonCard/PokemonCard";
import { Grid } from "@mui/material";
import { POKEMON_LIMIT } from "../../constants/pokemon";
import "./LocationArea.css";

export default function LocationArea() {

    const { locationAreaName } = useParams();

    const [locationAreaData, setLocationAreaData] = useState(null);

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/location-area/${locationAreaName}/`;

        async function getLocationAreaData() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setLocationAreaData(data);
            } catch(error) {
                console.error("Error fetching location area data:", error);
            }
        }
        getLocationAreaData();
    }, [locationAreaName]);

    const displayName = locationAreaData?.names?.find(n => n.language?.name === 'en')?.name || locationAreaName;

    const pokemonEncounters = locationAreaData?.pokemon_encounters || [];

    // Extract Pokemon ID from the URL e.g. https://pokeapi.co/api/v2/pokemon/54/ -> 54
    const getId = (url) => url.match(/\/(\d+)\/?$/)?.[1];

    return (
        <React.Fragment>
            <Header />
            <div className="locationAreaContainer">
                <h1 className="locationAreaTitle">{displayName}</h1>
                <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    className="pokemonEncountersContainer"
                >
                    {pokemonEncounters
                        .filter((encounter) => parseInt(getId(encounter.pokemon.url)) <= POKEMON_LIMIT)
                        .map((encounter) => {
                            const pokemonId = getId(encounter.pokemon.url);
                            return (
                                <Grid item xs={12} sm={6} md={3} lg={3} xl={2} key={encounter.pokemon.name}>
                                    <PokemonCard pokemonId={pokemonId} />
                                </Grid>
                            );
                        })}
                </Grid>
            </div>
        </React.Fragment>
    );
}
