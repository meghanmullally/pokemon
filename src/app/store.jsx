import { configureStore } from "@reduxjs/toolkit";

// Importing the reducer from your `PokemonSlice` file
import pokemonReducer from "../components/PokemonSlice";

// Creating and exporting the Redux store using `configureStore`
export const store = configureStore({
    // The `reducer` field is where you specify all the reducers that will be part of your store
    reducer: {
        // The key "pokemon" in the state will be managed by the `pokemonReducer`
        pokemon: pokemonReducer,
    },
});
