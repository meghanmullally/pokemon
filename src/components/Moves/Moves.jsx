import React, { useState } from 'react';
import { Paper, Tab, Tabs, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './Moves.css';

const Moves = ({ pokemonDetails }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Destructure different move types
  const { moves } = pokemonDetails;

  // Group and sort moves by category
  const levelUpMoves = moves
    .filter(move => move.version_group_details.some(detail => detail.move_learn_method.name === 'level-up'))
    .sort((a, b) => {
      const levelA = a.version_group_details.find(detail => detail.move_learn_method.name === 'level-up').level_learned_at;
      const levelB = b.version_group_details.find(detail => detail.move_learn_method.name === 'level-up').level_learned_at;
      // Sort in ascending order
      return levelA - levelB;
    });

  const tmMoves = moves.filter(move => move.version_group_details.some(detail => detail.move_learn_method.name === 'machine'));
  const eggMoves = moves.filter(move => move.version_group_details.some(detail => detail.move_learn_method.name === 'egg'));
  const tutorMoves = moves.filter(move => move.version_group_details.some(detail => detail.move_learn_method.name === 'tutor'));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Paper className='moveContainer'>
      <h3 className="movesTitle">
        Moves
        <Tooltip
          title="A Move is an ability that a Pokémon uses during Pokémon Battles. Moves are mainly used to inflict damage on the opponent. Moves usually come from a natural ability that the specific Pokémon has."
          arrow
        >
          <InfoOutlinedIcon className="infoIcon" />
        </Tooltip>
      </h3>

      <Tabs value={activeTab} onChange={handleTabChange} aria-label="moves tabs">
        {levelUpMoves.length > 0 && <Tab label="Level Up Moves" />}
        {tmMoves.length > 0 && <Tab label="TM/HM Moves" />}
        {eggMoves.length > 0 && <Tab label="Egg Moves" />}
        {tutorMoves.length > 0 && <Tab label="Tutor Moves" />}
      </Tabs>

      {activeTab === 0 && levelUpMoves.length > 0 && (
        <div className="tabContent">
          <h3 className="bio_title">
            Moves Learned by Leveling Up
            <Tooltip
              title="Moves that a Pokémon learns automatically as it levels up."
              arrow
            >
              <InfoOutlinedIcon className="infoIcon" />
            </Tooltip>
          </h3>
          <ul className="moveList moveListContainer">
            {levelUpMoves.map((move) => (
              <li key={move.move.name} className="moveItem">
                <strong>{move.move.name}</strong> (Level: {move.version_group_details.find(detail => detail.move_learn_method.name === 'level-up').level_learned_at})
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 1 && tmMoves.length > 0 && (
        <div className="tabContent">
          <h3 className="bio_title">
            TM/HM Moves
            <Tooltip
              title="Moves that can be taught to Pokémon using Technical Machines (TM) or Hidden Machines (HM)."
              arrow
            >
              <InfoOutlinedIcon className="infoIcon" />
            </Tooltip>
          </h3>
          <ul className="moveList moveListContainer">
            {tmMoves.map((move) => (
              <li key={move.move.name} className="moveItem">
                <strong>{move.move.name}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 2 && eggMoves.length > 0 && (
        <div className="tabContent">
          <h3 className="bio_title">
            Egg Moves
            <Tooltip
              title="Moves that Pokémon can inherit from their parents when they are bred."
              arrow
            >
              <InfoOutlinedIcon className="infoIcon" />
            </Tooltip>
          </h3>
          <ul className="moveList moveListContainer">
            {eggMoves.map((move) => (
              <li key={move.move.name} className="moveItem">
                <strong>{move.move.name}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 3 && tutorMoves.length > 0 && (
        <div className="tabContent">
          <h3 className="bio_title">
            Tutor Moves
            <Tooltip
              title="Moves that can be taught to Pokémon by a Move Tutor."
              arrow
            >
              <InfoOutlinedIcon className="infoIcon" />
            </Tooltip>
          </h3>
          <ul className="moveList moveListContainer">
            {tutorMoves.map((move) => (
              <li key={move.move.name} className="moveItem">
                <strong>{move.move.name}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Paper>
  );
};

export default Moves;