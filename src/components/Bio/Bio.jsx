import React from "react";
import { Paper, Divider, Tooltip, Button, Grid } from '@mui/material';
import './Bio.css';

export default function Bio({ pokemonDetails, pokemonSpecies }) {
    const { abilities, height, weight } = pokemonDetails;
    const { egg_groups, capture_rate, growth_rate, gender_rate, habitat, generation, base_happiness, hatch_counter, flavor_text_entries } = pokemonSpecies;


    // Pokemon Height & Weight
    let pokemonHeight = null;
    let pokemonWeight = null;

    // Pokemon Height (feet) & Weight (lbs)
    let pokemonHeightFeet = null;
    let pokemonWeightLbs = null;

    if (pokemonDetails) {
        // The pokemon's height in decimetres which is converted into metres by dividing by 10
        pokemonHeight = (height / 10);
        // for an approximate result, multiply the length value by 3.281
        pokemonHeightFeet = (height / 10 * 3.28);
        // The pokemon's weight in hectograms which is converted into kilograms by dividing by 10
        pokemonWeight = (weight / 10);
        // for an approximate result, multiply the mass value by 2.205
        pokemonWeightLbs = (weight *  0.2205).toFixed(1);
    }

    return (
        <>
            <Paper className="bio_paper">
                <Grid wrap="nowrap" container spacing={2} columns={16}>
                    <Grid item xs={8}>
                    <h3 className="bio_title"> About</h3>
                        <p className='description'>{flavor_text_entries[0].flavor_text}</p>
                        <Divider />
                        <h3 className="bio_title"> Generation</h3>
                        <p className='bio_para'>{generation.name}</p>
                        <Divider />
                        <h3 className="bio_title">Height:</h3> 
                        <p className='bio_para'>{pokemonHeight} m / {pokemonHeightFeet} "</p>
                        <h3 className="bio_title">Weight:</h3> 
                        <p className='bio_para'> {pokemonWeight} kg / {pokemonWeightLbs} lbs </p>
                        <Divider />
                        <h3 className="bio_title">Habitat</h3>
                        <p className='bio_para'>{habitat.name}</p>
                        <Divider />
                        <h3 className="bio_title">Capture Rate</h3>
                        <p className='bio_para'>{capture_rate}</p>
                        <h3 className="bio_title">Base Happiness</h3>
                        <p className='bio_para'>{base_happiness}</p>
                    </Grid>
                    <Grid item xs={8}>
                        <h3 className="bio_title">Growth Rate</h3>
                        <p className='bio_para'>{growth_rate.name}</p>
                        <h3 className="bio_title">Gender Ratio</h3>
                        <p className='bio_para'>{gender_rate}</p>
                            <h3 className="bio_title">Hatch Counter</h3>
                            <p className='bio_para'>{hatch_counter}</p>
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
