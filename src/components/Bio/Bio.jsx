import React from "react";
import { Paper, Divider, Tooltip, Button, Grid } from '@mui/material';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
import './Bio.css';

export default function Bio({ pokemonDetails, pokemonSpecies }) {
    const { abilities, height, weight } = pokemonDetails;
    const { egg_groups, capture_rate, growth_rate, gender_rate, evolution_chain, habitat, generation, base_happiness, hatch_counter } = pokemonSpecies;


    // Pokemon Height & Weight
    let pokemonHeight = null;
    let pokemonWeight = null;


    if (pokemonDetails) {
        // The pokemon's height in decimetres which is converted into metres by dividing by 10
        pokemonHeight = (pokemonDetails.height / 10);
        // The pokemon's weight in hectograms which is converted into kilograms by dividing by 10
        pokemonWeight = (pokemonDetails.weight / 10);
    }

    return (
        <>
            <Paper className="bio_paper">
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={8}>
                        <h3 className="bio_title"> Generation</h3>
                        <p>{generation.name}</p>
                        <Divider />
                        {/* <h3 className="bio_title">Height and Weight: </h3> */}
                        {/* <p>Height: {height / 10} m</p>
                        <p>Weight: {weight / 10} kg</p> */}
                        {/* <HeightIcon /> */}
                        <p><strong>Height: </strong>{pokemonHeight} m</p>
                        {/* <ScaleIcon /> */}
                        <p><strong>Weight: </strong> {pokemonWeight} kg</p>
                        <Divider />
                        <h3 className="bio_title">Habitat</h3>
                        <p>{habitat.name}</p>
                        <Divider />
                        <h3 className="bio_title">Capture Rate</h3>
                        <p>{capture_rate}</p>
                    </Grid>
                    <Grid item xs={8}>
                        <h3 className="bio_title">Growth Rate</h3>
                        {growth_rate.name}
                        <h3 className="bio_title">Gender Ratio</h3>
                        <p>{gender_rate}</p>
                        <Divider />
                        <h3 className="bio_title"> Abilities: </h3>
                        <ul className="ability_btn">
                            {abilities.map((ability) => (
                                <Button variant="outlined" key={ability.ability.name}>
                                    {ability.ability.name}
                                </Button>
                            ))}
                        </ul>
                        <h3 className="bio_title">Egg Group: </h3>
                        <ul className="egg_btn">
                            {egg_groups.map((group) => (
                                <Button variant="outlined" key={group.name}>
                                    {group.name}
                                </Button>
                            ))}
                        </ul>
                    </Grid>
                </Grid> {/* ending Grid */}
            </Paper>
        </>
    );
}
