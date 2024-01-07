import React from "react";
import { Paper, Divider, Tooltip, Button, Grid } from '@mui/material';
import './Bio.css';

export default function Bio({ pokemonDetails, pokemonSpecies }) {
    const { abilities, height, weight } = pokemonDetails;
    const { egg_groups, capture_rate, growth_rate, gender_rate, evolution_chain, habitat, generation, base_happiness, hatch_counter, flavor_text_entries } = pokemonSpecies;


    // Pokemon Height & Weight
    let pokemonHeight = null;
    let pokemonWeight = null;


    if (pokemonDetails) {
        // The pokemon's height in decimetres which is converted into metres by dividing by 10
        pokemonHeight = (height / 10);
        // The pokemon's weight in hectograms which is converted into kilograms by dividing by 10
        pokemonWeight = (weight / 10);
    }

    return (
        <>
            <Paper className="bio_paper">
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={8}>
                    <h3 className="bio_title"> About</h3>
                        <p>{flavor_text_entries[0].flavor_text}</p>
                        <Divider />
                        <h3 className="bio_title"> Generation</h3>
                        <p>{generation.name}</p>
                        <Divider />
                        <p><strong>Height: </strong>{pokemonHeight} m</p>
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
