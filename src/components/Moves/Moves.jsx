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
  const [activeTab, setActiveTab] = useState(null);

  // Helper function to filter and sort moves based on the category
  const getFilteredMoves = (category) => {
    let filteredMoves = moves.filter(category.filter);
    if (category.sort) {
      filteredMoves = filteredMoves.sort(category.sort);
    }
    return filteredMoves;
  };

  const availableCategories = moveCategories.filter(
    (category) => getFilteredMoves(category).length > 0
  );

  const currentTab = activeTab && availableCategories.find(c => c.key === activeTab)
    ? activeTab
    : availableCategories[0]?.key ?? null;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (availableCategories.length === 0) return null;

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

      {/* Render Tabs — value is category key, not positional index */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="moves tabs"
      >
        {availableCategories.map((category) => (
          <Tab key={category.key} value={category.key} label={category.label} />
        ))}
      </Tabs>

      {/* Render Content for the Active Tab */}
      {availableCategories.map((category) => {
        if (currentTab !== category.key) return null;
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
                      )?.level_learned_at ?? '?'
                    })`
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </Paper>
  );
};

export default Moves;