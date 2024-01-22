import React from "react";
import { Paper, Divider, Typography, Button, Grid, Tooltip } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import "./Bio.css";

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
    pokemonHeight = height / 10;
    // for an approximate result, multiply the length value by 3.281
    pokemonHeightFeet = (height / 10) * 3.28;
    // The pokemon's weight in hectograms which is converted into kilograms by dividing by 10
    pokemonWeight = weight / 10;
    // for an approximate result, multiply the mass value by 2.205
    pokemonWeightLbs = (weight * 0.2205).toFixed(1);
  }

  return (
    <>
      <Paper elevation={0} className="bio_paper" >
        <Grid wrap="nowrap" container spacing={1} columns={16}>
          <Grid item xs={8} className="bioGrid">
            <h3 className="bio_title">About</h3>
            <p className="description">{flavor_text_entries[0].flavor_text}</p>
            <Divider />
            {/* <h3 className="bio_title"> Generation</h3>
            <p className="bio_para">{generation.name}</p> */}
            <div className="bioInfo">
              <strong>Generation: </strong>
              <span>{generation.name}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Height: </strong>
              <span>{pokemonHeight} m / {pokemonHeightFeet} "</span>
              <br></br>
              <strong>Weight: </strong>
              <span>{pokemonWeight} kg / {pokemonWeightLbs} lbs</span>
            </div>
            {/* <h3 className="bio_title">Height</h3>
            <p className="bio_para">
              {pokemonHeight} m / {pokemonHeightFeet} "
            </p> */}
            {/* <h3 className="bio_title">Weight</h3>
            <p className="bio_para">
              {pokemonWeight} kg / {pokemonWeightLbs} lbs
            </p> */}
            <Divider />
            <div className="bioInfo">
              <strong>Habitat: </strong>
              <span>{habitat.name}</span>
            </div>
            <Divider />
            <div className="bioInfo">
            <strong>Capture Rate: </strong>
              <span>{capture_rate}</span>
            {/* <h3 className="bio_title">Capture Rate</h3>
            <p className="bio_para">{capture_rate}</p> */}
            </div>
            <Divider />
            <div className="bioInfo">
            <strong>Base Happiness: </strong>
              <span>{base_happiness}</span>
            {/* <h3 className="bio_title">Base Happiness</h3>
            <p className="bio_para">{base_happiness}</p> */}
            </div>
            {/* <h3 className="bio_title">Habitat</h3>
            <p className="bio_para">{habitat.name}</p> */}
          </Grid>
          <Divider orientation="vertical" variant="middle" />
          <Grid item xs={8} className="bioGrid">
          <div className="bioInfo">
            <strong>Growth Rate: </strong>
              <span>{growth_rate.name}</span>
            {/* <h3 className="bio_title">Growth Rate</h3>
            <p className="bio_para">{growth_rate.name}</p> */}
            </div>
            <Divider />
            <div className="bioInfo">
            <strong>Gender Ratio: </strong>
              <span>{gender_rate}</span>
            {/* <h3 className="bio_title">Gender Ratio</h3>
            <p className="bio_para">{gender_rate}</p> */}
            </div>
            <Divider />
            <div className="bioInfo">
            <strong>Hatch Counter: </strong>
              <span>{hatch_counter}</span>
            {/* <h3 className="bio_title">Hatch Counter</h3>
            <p className="bio_para">{hatch_counter}</p> */}
            </div>
            <Divider />
            <h3 className="abilityTitle"> Abilities 
            <Tooltip title="Abilities are a game mechanic introduced in Gen-III, which causes a passive effect during battle or the overworld. 
            Pokemon usually have one ability and the most any species or form can have are three: two normal Abilities and one Hidden Ability." 
            arrow>
              <InfoOutlinedIcon className="infoIcon"/>
              </Tooltip>
            </h3>
            <ul className="ability_btn">
              {abilities.map((ability) => (
                <Button
                  color={ability.is_hidden ? "secondary" : "primary"}
                  variant={ability.is_hidden ? "outlined" : "outlined"}
                  key={ability.ability.name}
                >
                  {ability.ability.name}
                </Button>
              ))}
            </ul>
            <Divider />
            <h3 className="bio_title">Egg Group</h3>
            <ul className="egg_btn">
              {egg_groups.map((group) => (
                <Button variant="outlined" key={group.name}>
                  {group.name}
                </Button>
              ))}
            </ul>
          </Grid>
        </Grid>
        {/* ending Grid */}
      </Paper>
    </>
  );
}
