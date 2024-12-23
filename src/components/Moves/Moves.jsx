import React, { useState } from 'react';
import { Paper, Tab, Tabs, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './Moves.css';

// Define move categories and their descriptions
const moveCategories = [
  {
    label: "Level Up Moves",
    key: "level-up",
    tooltip: "Moves that a Pokémon learns automatically as it levels up.",
    filter: (move) => move.version_group_details.some(detail => detail.move_learn_method.name === "level-up"),
    sort: (a, b) => {
      const levelA = a.version_group_details.find(detail => detail.move_learn_method.name === "level-up").level_learned_at;
      const levelB = b.version_group_details.find(detail => detail.move_learn_method.name === "level-up").level_learned_at;
      return levelA - levelB;
    },
  },
  {
    label: "TM/HM Moves",
    key: "machine",
    tooltip: "Moves that can be taught to Pokémon using Technical Machines (TM) or Hidden Machines (HM).",
    filter: (move) => move.version_group_details.some(detail => detail.move_learn_method.name === "machine"),
  },
  {
    label: "Egg Moves",
    key: "egg",
    tooltip: "Moves that Pokémon can inherit from their parents when they are bred.",
    filter: (move) => move.version_group_details.some(detail => detail.move_learn_method.name === "egg"),
  },
  {
    label: "Tutor Moves",
    key: "tutor",
    tooltip: "Moves that can be taught to Pokémon by a Move Tutor.",
    filter: (move) => move.version_group_details.some(detail => detail.move_learn_method.name === "tutor"),
  },
];

const Moves = ({ moves = [] }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Helper function to filter and sort moves based on the category
  const getFilteredMoves = (category) => {
    let filteredMoves = moves.filter(category.filter);
    if (category.sort) {
      filteredMoves = filteredMoves.sort(category.sort);
    }
    return filteredMoves;
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Paper className="moveContainer">
      <h3 className="movesTitle">
        Moves
        <Tooltip
          title="A Move is an ability that a Pokémon uses during Pokémon Battles. Moves are mainly used to inflict damage on the opponent. Moves usually come from a natural ability that the specific Pokémon has."
          arrow
        >
          <InfoOutlinedIcon className="infoIcon" />
        </Tooltip>
      </h3>

      {/* Render Tabs */}
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="moves tabs">
        {moveCategories.map((category, index) => {
          const filteredMoves = getFilteredMoves(category);
          return (
            filteredMoves.length > 0 && <Tab key={category.key} label={category.label} />
          );
        })}
      </Tabs>

      {/* Render Content for the Active Tab */}
      {moveCategories.map((category, index) => {
        if (activeTab === index) {
          const filteredMoves = getFilteredMoves(category);
          return (
            <div key={category.key} className="moveTabContent">
              <h3 className="bio_title">
                {category.label}
                <Tooltip title={category.tooltip} arrow>
                  <InfoOutlinedIcon className="infoIcon" />
                </Tooltip>
              </h3>
              <ul className="moveList moveListContainer">
                {filteredMoves.map((move) => (
                  <li key={move.move.name} className="moveItem">
                    <strong>{move.move.name}</strong>
                    {category.key === "level-up" && (
                      ` (Level: ${
                        move.version_group_details.find(
                          (detail) => detail.move_learn_method.name === "level-up"
                        ).level_learned_at
                      })`
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        return null;
      })}
    </Paper>
  );
};

export default Moves;