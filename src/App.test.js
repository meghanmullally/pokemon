import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './components/PokemonSlice';

// Create a mock store for testing
const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

test('renders search input for pokemon after loading', async () => {
  // Render the App component with the Provider wrapping it
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Wait for the search input to appear by label text, since the placeholder is not used
  const searchInput = await screen.findByLabelText(/search for pokemon/i);

  // Assert that the search input is now present in the DOM
  expect(searchInput).toBeInTheDocument();
});