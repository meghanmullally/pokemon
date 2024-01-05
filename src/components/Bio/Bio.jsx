import React from "react";
import { Paper, Divider, Tooltip, Button } from '@mui/material';
import './Bio.css';

export default function Bio({ pokemonDetails, pokemonSpecies }) {
    const { abilities, height, weight } = pokemonDetails;
    const { flavor_text_entries, egg_groups } = pokemonSpecies;

    return (
        <>
            <Paper>
                <h2 className="bio_title">About: </h2>
                <p className="description">{flavor_text_entries[0].flavor_text}</p>
                <Divider />
                <h2 className="bio_title"> Abilities: </h2>
                {/* Abilities: {pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')} */}
                <ul className="ability_btn">
                    {abilities.map((ability) => (
                        <Button variant="outlined" key={ability.ability.name}>
                            {ability.ability.name}
                        </Button>
                    ))}
                </ul>
                {/* <Divider />
                <h2>Height and Weight: </h2>
                <p>Height: {height / 10} m</p>
                <p>Weight: {weight / 10} kg</p> */}
                <Divider />
                <h2 className="bio_title">Egg Group: </h2>
                <ul className="egg_btn">
                    {egg_groups.map((group) => (
                        <Button variant="outlined" key={group.name}>
                            {group.name}
                        </Button>
                    ))}
                </ul>
            </Paper>
        </>
    );
}
