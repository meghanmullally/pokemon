import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokemonData: {},
        searchOptionData: [],
        historyData: [],
        filterSearch: ""
    },
    reducers: {
        setPokemonData(state, action) {
            state.pokemonData = action.payload;
        },
        setSearchOptionData(state, action) {
            state.searchOptionData = action.payload;
        },
        updateHistory(state, action) {
            if (!state.historyData.find(element => element.name === action.payload.name)) {
                state.historyData.push(action.payload);
                state.searchOptionData.unshift(action.payload);
            }
        },
        updateFilterSearch(state, action) {
            state.filterSearch = action.payload;
        }
    }
});

export const pokemonActions = pokemonSlice.actions;
export default pokemonSlice.reducer;
