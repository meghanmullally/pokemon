import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './RegionDetails.css';
import { Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { REGION_COLORS } from '../../constants/pokemon';

export default function RegionDetails() {

    const { regionName } = useParams();
    const navigate = useNavigate();

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
    }, [regionName]);

    const displayName = regionData.names?.find(n => n.language?.name === 'en')?.name || regionName;
    const locations = regionData.locations || [];
    const regionColor = REGION_COLORS[regionName] || '#ccc';

    // Categorize locations by keywords in their name
    const includes = (name, keywords) => keywords.some(k => name.includes(k));

    const cities  = locations.filter(l => includes(l.name, ['city', 'town', 'village', 'settlement', 'plateau', 'academy']));
    const routes  = locations.filter(l => includes(l.name, ['route']));
    const caves   = locations.filter(l => includes(l.name, ['cave', 'cavern', 'tunnel', 'underground', 'dungeon', 'grotto', 'chamber']));
    const water   = locations.filter(l => includes(l.name, ['sea', 'lake', 'bay', 'shore', 'beach', 'lagoon', 'river', 'falls', 'coast', 'ocean', 'reef', 'spring', 'swamp', 'bog', 'fen']));
    const nature  = locations.filter(l => includes(l.name, ['forest', 'field', 'meadow', 'plains', 'grove', 'prairie', 'garden', 'highland', 'mountain', 'peak', 'hill', 'slope', 'summit', 'valley', 'canyon', 'cliff', 'path', 'trail', 'pass', 'ravine', 'wastes', 'lowlands', 'marsh']));
    const other   = locations.filter(l => ![...cities, ...routes, ...caves, ...water, ...nature].includes(l));

    const formatName = (name) => name.replace(/-/g, ' ').toUpperCase();

    const LocationCard = ({ location }) => (
        <Paper
            key={location.name}
            elevation={4}
            className="locationPaper"
            style={{ background: `${regionColor}18` }}
            onClick={() => navigate(`/locations/${location.name}`)}
        >
            <div className="locationName">{formatName(location.name)}</div>
        </Paper>
    );

    const LocationGroup = ({ title, locations }) => {
        if (locations.length === 0) return null;
        return (
            <div className="locationGroup">
                <h2 className="locationGroupTitle" style={{ color: regionColor }}>{title}</h2>
                <div className="locationContainer">
                    {locations.map(location => <LocationCard key={location.name} location={location} />)}
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            <Header />
            <h1 className="regionDetailsTitle">{displayName}</h1>
            <LocationGroup title="Cities & Towns" locations={cities} />
            <LocationGroup title="Routes" locations={routes} />
            <LocationGroup title="Caves & Dungeons" locations={caves} />
            <LocationGroup title="Water & Coastal" locations={water} />
            <LocationGroup title="Forests & Nature" locations={nature} />
            <LocationGroup title="Other" locations={other} />
        </React.Fragment>
    );
}
