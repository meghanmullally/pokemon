import React, { useState } from "react";
import { Paper, Divider, Button, Tabs, Tab, Tooltip, Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./Bio.css";

export default function Bio({ pokemonDetails, pokemonSpecies, characteristicDetails }) {
  const { abilities, height, weight } = pokemonDetails;
  const { egg_groups, capture_rate, growth_rate, gender_rate, habitat, generation, base_happiness, hatch_counter, flavor_text_entries, genera, shape } = pokemonSpecies;
  const { characteristicDescription } = characteristicDetails || {};

  // State to manage the currently selected tab
  const [tabValue, setTabValue] = useState(0);

  // Handler to change the selected tab
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Find the first English flavor text entry
  const englishFlavorText = flavor_text_entries ? flavor_text_entries.find((entry) => entry.language.name === "en") : null;
  // Use the first English entry if found, otherwise use an empty string
  const flavorText = englishFlavorText ? englishFlavorText.flavor_text : "Flavor text not available";

// Pokemon Height & Weight

// The pokemon's height in decimeters which is converted into meters by dividing by 10  
  const pokemonHeight = height ? (height / 10).toFixed(2) : null;
// For an approximate result, multiply the length value by 3.281
  const pokemonHeightFeet = height ? ((height / 10) * 3.281).toFixed(2) : null;
// The pokemon's weight in hectograms which is converted into kilograms by dividing by 10
  const pokemonWeight = weight ? (weight / 10).toFixed(2) : null;
// For an approximate result, multiply the mass value by 2.205
  const pokemonWeightLbs = weight ? (weight * 0.2205).toFixed(2) : null;

  return (
    <>
      <Paper elevation={0} className="bio_paper">
        <Tabs value={tabValue} onChange={handleChange} variant="fullWidth" aria-label="bio tabs">
          <Tab label="Overview" />
          <Tab label="Physical Stats" />
          <Tab label="Abilities & Egg Group" />
          <Tab label="Additional Info" />
        </Tabs>
        <Divider />

        {/* Overview Tab */}
        {tabValue === 0 && (
          <Box className="tabContent">
            <h3 className="bio_title">About</h3>
            <p className="description">{flavorText}</p>
            <Divider />
            <div className="bioInfo">
              <strong>Genus: </strong>
              <span>{genera?.[7]?.genus || "Genus data not available"}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Generation: </strong>
              <span>{generation?.name || "Generation data not available"}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Growth Rate: </strong>
              <span>{growth_rate?.name || "Growth rate not available"}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Shape: </strong>
              <span>{shape?.name || "Shape data not available"}</span>
            </div>
          </Box>
        )}

        {/* Physical Stats Tab */}
        {tabValue === 1 && (
          <Box className="tabContent">
            <h3 className="bio_title">Physical Stats</h3>
            <div className="bioInfo">
              <strong>Height: </strong>
              <span>{pokemonHeight ? `${pokemonHeight} m / ${pokemonHeightFeet} ft` : "Height data not available"}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Weight: </strong>
              <span>{pokemonWeight ? `${pokemonWeight} kg / ${pokemonWeightLbs} lbs` : "Weight data not available"}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Capture Rate: </strong>
              <span>{capture_rate !== undefined ? capture_rate : "Capture rate not available"}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Base Happiness: </strong>
              <span>{base_happiness !== undefined ? base_happiness : "Base happiness data not available"}</span>
            </div>
            <Divider />
            <div className="bioInfo">
              <strong>Gender Ratio: </strong>
              <span>{gender_rate !== undefined ? gender_rate : "Gender ratio data not available"}</span>
            </div>
          </Box>
        )}

        {/* Abilities & Egg Group Tab */}
        {tabValue === 2 && (
          <Box className="tabContent">
            <h3 className="abilityTitle">
              Abilities
              <Tooltip title="Abilities are a game mechanic introduced in Gen-III, which causes a passive effect during battle or the overworld." arrow>
                <InfoOutlinedIcon className="infoIcon" />
              </Tooltip>
            </h3>

            {abilities && abilities.length > 0 ? (
              <ul className="ability_btn">
                {abilities.map((ability, index) => (
                  <Tooltip
                    key={`${ability.ability.name}-${index}`}
                    title={ability.is_hidden ? "Hidden Ability" : "Normal Ability"}
                    arrow
                  >
                    <Button color={ability.is_hidden ? "secondary" : "primary"} variant="outlined">
                      {ability.ability.name}
                    </Button>
                  </Tooltip>
                ))}
              </ul>
            ) : (
              <p>No abilities available</p>
            )}

            {egg_groups && egg_groups.length > 0 ? (
              <>
                <Divider />
                <h3 className="bio_title">Egg Group</h3>
                <ul className="egg_btn">
                  {egg_groups.map((group) => (
                    <Button variant="outlined" key={group.name}>
                      {group.name}
                    </Button>
                  ))}
                </ul>
              </>
            ) : (
              <p>No egg group data available</p>
            )}
          </Box>
        )}

        {/* Additional Info Tab */}
        {tabValue === 3 && (
          <Box className="tabContent">
            <h3 className="bio_title">Additional Info</h3>
            {characteristicDescription ? (
              <>
                <div className="bioInfo">
                  <strong>Characteristic: </strong>
                  <span>{characteristicDescription}</span>
                </div>
                <Divider />
              </>
            ) : (
              <div className="bioInfo">
                <strong>Characteristic: </strong>
                <span>Characteristic data not available</span>
              </div>
            )}
            {habitat?.name && (
              <>
                <div className="bioInfo">
                  <strong>Habitat: </strong>
                  <span>{habitat.name}</span>
                </div>
                <Divider />
              </>
            )}
            {hatch_counter !== undefined && (
              <div className="bioInfo">
                <strong>Hatch Counter: </strong>
                <span>{hatch_counter}</span>
              </div>
            )}
          </Box>
        )}
      </Paper>
    </>
  );
}