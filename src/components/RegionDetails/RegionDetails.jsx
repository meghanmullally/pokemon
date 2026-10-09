import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './RegionDetails.css';
import { Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export default function RegionDetails() {

    // regionName comes from the URL e.g. /regions/kanto
    const { regionName } = useParams();
    const navigate = useNavigate();

    // Holds the full region object from the API (locations, name, etc.)
    const [regionData, setRegionData] = useState({});

    useEffect(() => {
        async function getRegionDetails() {
            const url = `https://pokeapi.co/api/v2/region/${regionName}/`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                setRegionData(data);
            } catch(error) {
                console.error("Error fetching region details:", error);
            }
        }

        getRegionDetails();
    }, [regionName]); // re-runs whenever the region in the URL changes

    // Get the English display name from the names array, fallback to the URL name
    const displayName = regionData.names?.find(n => n.language?.name === 'en')?.name
        || regionName?.toUpperCase();

    // The locations array from the region data
    const locations = regionData.locations || [];

    return (
        <React.Fragment>
            <Header />
            <h1 className="regionDetailsTitle">{displayName}</h1>
            <div className="locationContainer">
                {locations.map((location) => (
                    <Paper
                        key={location.name}
                        elevation={4}
                        className="locationPaper"
                        onClick={() => navigate(`/locations/${location.name}`)}
                    >
                        <div className="locationName">
                            {location.name.replace(/-/g, ' ').toUpperCase()}
                        </div>
                    </Paper>
                ))}
            </div>
        </React.Fragment>
    );
}
