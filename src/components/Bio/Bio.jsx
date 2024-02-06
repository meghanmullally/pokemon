import React from "react";
import { Paper, Divider, Button, Grid, Tooltip } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import "./Bio.css";

export default function Bio({ pokemonDetails, pokemonSpecies, characteristicDetails }) {
  const { abilities, height, weight } = pokemonDetails;
  const { egg_groups, capture_rate, growth_rate, gender_rate, habitat, generation, base_happiness, hatch_counter, flavor_text_entries, genera, shape } = pokemonSpecies;
  const { characteristicDescription } = characteristicDetails || {};

  const englishFlavorText = flavor_text_entries.find((entry) => entry.language.name === 'en');
  // Use the first English entry if found, otherwise use an empty string
  const flavorText = englishFlavorText ? englishFlavorText.flavor_text : '';


  // Pokemon Height & Weight
  let pokemonHeight = null;
  let pokemonWeight = null;

  // Pokemon Height (feet) & Weight (lbs)
  let pokemonHeightFeet = null;
  let pokemonWeightLbs = null;

  if (pokemonDetails) {
    // The pokemon's height in decimetres which is converted into metres by dividing by 10
    pokemonHeight = (height / 10).toFixed(2);
    // for an approximate result, multiply the length value by 3.281
    pokemonHeightFeet = ((height / 10) * 3.281).toFixed(2);
    // The pokemon's weight in hectograms which is converted into kilograms by dividing by 10
    pokemonWeight = (weight / 10).toFixed(2);
    // for an approximate result, multiply the mass value by 2.205
    pokemonWeightLbs = (weight * 0.2205).toFixed(2);
  }

  return (
    <>
      <Paper elevation={0} className="bio_paper" >
        <Grid wrap="nowrap" container spacing={1} columns={16}>
          <Grid item xs={8} className="bioGrid">
            <h3 className="bio_title">About</h3>
            <p className="description">{flavorText}</p>
            <Divider />

            {characteristicDetails && characteristicDescription && (<div className="bioInfo">
              <strong>Characteristic: </strong>
              <span>
                {characteristicDescription}
              </span>
            </div>)}
            <Divider />
            <div className="bioInfo">
              <strong>Generation: </strong>
              <span>{generation.name}</span>
            </div>
            <Divider />
            <div className="bmiInfo">
              <strong>Height: </strong>
              <span>{pokemonHeight} m / {pokemonHeightFeet} ft </span>
              <br></br>
              <strong>Weight: </strong>
              <span>{pokemonWeight} kg / {pokemonWeightLbs} lbs</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Habitat: </strong>
              <span>{habitat.name}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Capture Rate: </strong>
              <span>{capture_rate}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Base Happiness: </strong>
              <span>{base_happiness}</span>
            </div>
          </Grid>
          <Divider orientation="vertical" variant="middle" />
          <Grid item xs={8} className="bioGrid">
            <div className="bioInfo">
              <strong>Genus: </strong>
              <span>{genera[7].genus}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Shape: </strong>
              <span>{shape.name}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Growth Rate: </strong>
              <span>{growth_rate.name}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Gender Ratio: </strong>
              <span>{gender_rate}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Hatch Counter: </strong>
              <span>{hatch_counter}</span>
            </div>
            <Divider />
            <h3 className="abilityTitle"> Abilities
              <Tooltip title="Abilities are a game mechanic introduced in Gen-III, which causes a passive effect during battle or the overworld. 
            Pokemon usually have one ability and the most any species or form can have are three: two normal Abilities and one Hidden Ability."
                arrow>
                <InfoOutlinedIcon className="infoIcon" />
              </Tooltip>
            </h3>
            <ul className="ability_btn">
              {abilities.map((ability) => (
                <Tooltip key={ability.ability.name} title={ability.is_hidden ? "Hidden Ability" : "Normal Ability"} arrow>
                  <Button
                    color={ability.is_hidden ? "secondary" : "primary"}
                    variant={ability.is_hidden ? "outlined" : "outlined"}
                  >
                    {ability.ability.name}
                  </Button>
                </Tooltip>
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
