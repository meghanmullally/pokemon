import { TYPE_COLORS } from "../constants/pokemon";

// Helper function to generate Pokemon image URL
export const generatedPokemonImageUrl = (inputId) => {
    let url = "";

    if (parseInt(inputId) <= 649) {
        // this source only goes up to 649 pokemon when this project was implemented 
        url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${inputId}.svg`;
    } else {
        // this source goes up to 1010 pokemon when this project was implemented 
        url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${inputId}.png`;
    }

    return url;
};

// Helper function to determine card background color
export const getBackgroundColor = (types) => {
    if (types && types.length > 0) {
        // Get the primary type
        const primaryType = types[0]?.type?.name || "unknown";
        // Look up the color or default to "white"
        const color = TYPE_COLORS[primaryType] || "white";
        // Add transparency (e.g., 30% transparency)
        return `${color}30`;
    }
    // Default background color if no types exist
    return "white";
};