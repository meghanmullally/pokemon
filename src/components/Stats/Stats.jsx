import React from "react";
import { Paper} from '@mui/material';

export default function Stats({ pokemonDetails }) {
    const { stats } = pokemonDetails;


    return (
        <>
            <Paper className="stats_paper">
             <p>Stats will go here...wip</p>
            </Paper>
        </>
    );
}
