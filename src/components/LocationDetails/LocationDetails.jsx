import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './LocationDetails.css';
import { Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export default function LocationDetails() {

    const { locationName } = useParams();
    const navigate = useNavigate();

    // Holds the full location object from the API
    const [locationData, setLocationData] = useState({});

    useEffect(() => {
        async function getLocationDetails() {
            const url = `https://pokeapi.co/api/v2/location/${locationName}/`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                setLocationData(data);
            } catch(error) {
                console.error("Error fetching location details:", error);
            }
        }

        getLocationDetails();
    }, [locationName]); // re-runs whenever the location in the URL changes

    // Get the English display name, fallback to the URL name
    const displayName = locationData.names?.find(n => n.language?.name === 'en')?.name || locationName;

    // Areas are the sub-sections of a location where Pokémon encounters happen
    const areas = locationData.areas || [];

    return (
        <React.Fragment>
            <Header />
            <h1 className="locationDetailsTitle">{displayName}</h1>
            <div className="areaContainer">
                {areas.map((area) => (
                    <Paper
                        key={area.name}
                        elevation={4}
                        className="locationPaper"
                        onClick={() => navigate(`/location-areas/${area.name}`)}
                    >
                        <div className="locationName">
                            {area.name.replace(/-/g, ' ').toUpperCase()}
                        </div>
                    </Paper>
                ))}
            </div>
        </React.Fragment>
    );
}
