import React from "react";
import { Typography, LinearProgress } from '@mui/material';
import './Stats.css';

export default function Stats({ pokemonDetails }) {
    const { stats } = pokemonDetails;

    console.log('-----------------');
    console.log('IN STATS -----', stats);


    // normalizing the range
    const min = 0;
    // individual stats are typically capped at 255 and total at 510
    const max = 225;
    const normalise = (value) => ((value - min) * 100) / (max - min);

    // Function to set color based on the stat
    const getColor = (statName) => {
        const colorMap = {
            hp: '#A60000',
            attack: '#F08030',
            defense: '#F8D030',
            'special-attack': '#6890F0',
            'special-defense': '#78C850',
            speed: '#F85888',
        };

        return colorMap[statName] || 'gray';
    };


    return (
        <>
                {stats.map((stat) => (
                    <div key={stat.stat.name} className="stat_container">
                        <div className="stat_row">
                            <Typography variant="subtitle3" className="stat_name">{stat.stat.name}</Typography>
                            <Typography variant="subtitle3" color="textSecondary" className="stat_base_stat">{stat.base_stat}</Typography>
                        </div>
                        <LinearProgress
                            variant="determinate"
                            value={normalise(stat.base_stat)}
                            sx={{
                                width: '100%',
                                height: '10px',
                                borderRadius: '5px',
                                backgroundColor: 'lightgray', // Set a default background color
                                '.MuiLinearProgress-bar': {
                                    backgroundColor: getColor(stat.stat.name), // Set the color based on the stat
                                },
                            }}
                        />
                    </div>
                ))}           
        </>
    );
}