import { TYPE_COLORS } from "../constants/pokemon";

// Helper function to generate Pokemon image URL
export const generatedPokemonImageUrl = (inputId) => {
    const id = String(inputId).padStart(3, '0');
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
};

// Helper function to determine card background color
export const getBackgroundColor = (types) => {
    if (types && types.length === 2) {
        const firstColor = TYPE_COLORS[types[0]?.type?.name] || "#ffffff";
        const secondColor = TYPE_COLORS[types[1]?.type?.name] || "#ffffff";
        return `radial-gradient(circle at center, ${firstColor}90 0%, ${firstColor}55 45%, ${secondColor}70 75%, ${secondColor}95 100%)`;
    }
    if (types && types.length === 1) {
        const color = TYPE_COLORS[types[0]?.type?.name] || "white";
        return `radial-gradient(circle at center, ${color}90 0%, ${color}60 50%, ${color}30 100%)`;
    }
    return "white";
};