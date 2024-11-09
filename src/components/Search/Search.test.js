import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Search from './Search';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonSlice, { pokemonActions } from '../PokemonSlice';

const store = configureStore({
    reducer: {
        pokemon: pokemonSlice,
    },
});

describe('Search Component', () => {
    const mockOnChange = jest.fn();
    const mockLabel = 'Search for Pokemon';

    beforeEach(() => {
        render(
            <Provider store={store}>
                <Search onChange={mockOnChange} label={mockLabel} />
            </Provider>
        );
    });

    test('renders the Search component with input and label', () => {
        expect(screen.getByLabelText(/Search for Pokemon/i)).toBeInTheDocument();
    });

    test('displays autocomplete options when typing', async () => {
        await act(async () => {
            store.dispatch(pokemonActions.setSearchOptionData([
                { name: 'Bulbasaur' },
                { name: 'Pikachu' }
            ]));
        });

        const input = screen.getByLabelText(/Search for Pokemon/i);
        fireEvent.change(input, { target: { value: 'bul' } });

        await waitFor(() => expect(screen.queryByText(/Bulbasaur/i)).toBeInTheDocument());
        expect(mockOnChange).toHaveBeenCalled();
    });

    test('shows "Latest Searches" at the top with recently searched Pokémon', async () => {
        await act(async () => {
            // Add mock data for search options
            store.dispatch(pokemonActions.setSearchOptionData([
                { name: 'bulbasaur' },
                { name: 'pikachu' },
                { name: 'charmander' },
                { name: 'abomasnow' },
                { name: 'abra' },
                { name: 'absol' }
            ]));
            
            // Simulate multiple searches to populate "Latest Searches"
            store.dispatch(pokemonActions.updateHistory({ name: 'charmander' }));
            store.dispatch(pokemonActions.updateHistory({ name: 'pikachu' }));
            store.dispatch(pokemonActions.updateHistory({ name: 'bulbasaur' }));  // Most recent search
        });

        const input = screen.getByLabelText(/Search for Pokemon/i);

        // Simulate typing into the input to trigger the dropdown
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: 'a' } });

        // Wait for the grouped headers and options to appear in the dropdown
        await waitFor(() => {
            // Check that "Latest Searches" appears at the top
            expect(screen.getByText(/latest searches/i)).toBeInTheDocument();

            // Verify the order of recent searches
            const latestSearchItems = screen.getAllByText(/(charmander|pikachu|bulbasaur)/i);
            expect(latestSearchItems[0]).toHaveTextContent(/bulbasaur/i);  // Most recent first
            expect(latestSearchItems[1]).toHaveTextContent(/pikachu/i);
            expect(latestSearchItems[2]).toHaveTextContent(/charmander/i);  // Oldest last

            // Check for alphabetical grouping, such as the "A" group
            expect(screen.getByText(/^a$/i)).toBeInTheDocument();
            expect(screen.getByText(/abomasnow/i)).toBeInTheDocument();
            expect(screen.getByText(/abra/i)).toBeInTheDocument();
            expect(screen.getByText(/absol/i)).toBeInTheDocument();
        });
    });

    test('calls onChange when selecting an option', async () => {
        await act(async () => {
            store.dispatch(pokemonActions.setSearchOptionData([
                { name: 'Pikachu' }
            ]));
        });

        const input = screen.getByLabelText(/Search for Pokemon/i);
        fireEvent.change(input, { target: { value: 'pik' } });

        await waitFor(() => expect(screen.queryByText(/Pikachu/i)).toBeInTheDocument());
        fireEvent.click(screen.getByText(/Pikachu/i));
        expect(mockOnChange).toHaveBeenCalled();
    });
});