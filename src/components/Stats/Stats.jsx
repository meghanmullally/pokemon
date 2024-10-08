import React from "react";
import { Paper, Typography, LinearProgress } from "@mui/material";
import "./Stats.css";

export default function Stats({ pokemonDetails }) {
  // Fallback to an empty array if stats is undefined
  const { stats = [] } = pokemonDetails || {};
  // normalizing the range
  const min = 0;
  // individual stats are typically capped at 255 and total at 510
  const max = 225;
  const normalize = (value) => ((value - min) * 100) / (max - min);

  // Function to set color based on the stat
  const getColor = (statName) => {
    const colorMap = {
      hp: "#A60000",
      attack: "#F08030",
      defense: "#F8D030",
      "special-attack": "#6890F0",
      "special-defense": "#78C850",
      speed: "#F85888",
    };

    return colorMap[statName] || "gray";
  };

  return (
    <>
      <Paper elevation={0}>
        {stats.map((stat) => (
          <div key={stat.stat.name} className="stat_container">
            <div className="stat_row">
              <Typography variant="subtitle3" className="stat_name">
                {stat.stat.name}
              </Typography>
              <Typography
                variant="subtitle3"
                color="textSecondary"
                className="stat_base_stat"
              >
                {stat.base_stat}
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={normalize(stat.base_stat)}
              sx={{
                width: "100%",
                height: "14px",
                borderRadius: "5px",
                backgroundColor: "lightgray", // Set a default background color
                ".MuiLinearProgress-bar": {
                  backgroundColor: getColor(stat.stat.name), // Set the color based on the stat
                },
              }}
            />
          </div>
        ))}
      </Paper>
    </>
  );
}