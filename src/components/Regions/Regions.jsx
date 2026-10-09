import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Regions.css';
import { Card, CardContent, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { REGION_COLORS } from '../../constants/pokemon';

export default function Regions() {

    const navigate = useNavigate();

    const [regions, setRegionsData] = useState([]);

    useEffect(() => {
        async function getRegionData() {
            const url = "https://pokeapi.co/api/v2/region/";
            try {
                const response = await fetch(url);
                const data = await response.json();
                setRegionsData(data.results);
            } catch(error) {
                console.error("Error fetching region data:", error);
            }
        }
        getRegionData();
    }, []);

    return (
        <React.Fragment>
            <Header />
            <h1 className="regionsTitle">Regions</h1>
            <div className="regionContainer">
                {regions.map((region) => (
                    <Paper key={region.name} elevation={6} className="regionPaper" onClick={() => navigate(`/regions/${region.name}`)}>
                        <Card style={{ background: REGION_COLORS[region.name] || '#ccc' }}>
                            <CardContent className="cardRegionContent">
                                <div className="regionName">
                                    {region.name.toUpperCase()}
                                </div>
                            </CardContent>
                        </Card>
                    </Paper>
                ))}
            </div>
        </React.Fragment>
    );
}
