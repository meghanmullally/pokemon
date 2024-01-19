import React from 'react';
import {  Paper, Button } from '@mui/material';
import './Moves.css';



const Moves = ({ pokemonDetails }) => {

  return (
    <>
      <Paper className="moveContainer">
        <h3 className="bio_title">Moves: </h3>
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


