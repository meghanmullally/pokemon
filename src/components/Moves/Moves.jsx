import React from 'react';
import { Paper, Button, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './Moves.css';



const Moves = ({ pokemonDetails }) => {
  return (
    <>
      <Paper className="moveContainer">
        <h3 className="movesTitle">
          Moves:
          <Tooltip
          // https://pokemon.fandom.com/wiki/Move Source for Move definition 
            title="A Move is a ability that a Pokémon uses during Pokémon Battles. Moves are mainly used to inflict damage on the opponent. Moves usually come from a natural ability that the specific Pokémon has."
            arrow
          >
            <InfoOutlinedIcon className="infoIcon" />
          </Tooltip>
        </h3>
        <ul className="moveList">
          {pokemonDetails.moves.map((move) => (
            <Button
              id="moveBtn"
              variant="outlined"
              key={move.move.name}
              size="small"
            >
              {move.move.name}
            </Button>
          ))}
        </ul>
      </Paper>
    </>
  );
};

export default Moves;


