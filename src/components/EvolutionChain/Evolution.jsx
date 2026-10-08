import React from "react";
import { Paper, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PokemonCard from "../PokemonCard/PokemonCard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { POKEMON_LIMIT } from "../../constants/pokemon";
import "./Evolution.css";

// Recursively renders a node and its branches
function EvoNode({ node }) {
  if (!node || !node.id || parseInt(node.id) > POKEMON_LIMIT) return null;

  const validBranches = (node.evolvesTo || []).filter(
    (n) => n && parseInt(n.id) <= POKEMON_LIMIT
  );

  return (
    <div className="evoNode">
      <div className="evoCard">
        <PokemonCard pokemonId={node.id} />
      </div>
      {validBranches.length > 0 && (
        <>
          <div className="evoArrow">
            <KeyboardArrowRightIcon aria-hidden="true" />
          </div>
          <div className={validBranches.length > 1 ? "evoBranches" : "evoSingle"}>
            {validBranches.map((branch) => (
              <EvoNode key={branch.id} node={branch} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Evolution({ evolutionData }) {
  return (
    <Paper className="evoContainer">
      <h3 className="evoTitle">
        Evolution Chain
        <Tooltip
          title="An evolution chain shows the sequence of Pokémon evolutions, starting from a base form and progressing through its evolutionary stages."
          arrow
        >
          <InfoOutlinedIcon className="infoIcon" />
        </Tooltip>
      </h3>
      <div className="evoPoke">
        <EvoNode node={evolutionData} />
      </div>
    </Paper>
  );
}
