import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Bio from "./Bio";
import "@testing-library/jest-dom";

describe("Bio Component", () => {
    let mockPokemonDetails;
    let mockPokemonSpecies;
    let mockCharacteristicDetails;

    beforeEach(() => {
        mockPokemonDetails = {
            abilities: [
                { ability: { name: "overgrow" }, is_hidden: false },
                { ability: { name: "chlorophyll" }, is_hidden: true },
            ],
            height: 7,
            weight: 69,
        };

        mockPokemonSpecies = {
            egg_groups: [{ name: "monster" }, { name: "grass" }],
            capture_rate: 45,
            growth_rate: { name: "medium-slow" },
            gender_rate: 4,
            habitat: { name: "grassland" },
            generation: { name: "generation-i" },
            base_happiness: 50,
            hatch_counter: 20,
            flavor_text_entries: [
                {
                    flavor_text: "A strange seed was planted on its back at birth.",
                    language: { name: "en" },
                },
            ],
            genera: [{ genus: "Seed Pokémon" }],
            shape: { name: "quadruped" },
        };

        mockCharacteristicDetails = {
            characteristicDescription: "Likes to fight",
        };
    });

    test("renders Bio component with default 'Overview' tab", () => {
        render(<Bio pokemonDetails={mockPokemonDetails} pokemonSpecies={mockPokemonSpecies} characteristicDetails={mockCharacteristicDetails} />);

        expect(screen.getByText(/About/i)).toBeInTheDocument();
        expect(screen.getByText(/A strange seed was planted on its back at birth/i)).toBeInTheDocument();
        expect(screen.getByText("generation-i")).toBeInTheDocument();
        expect(screen.getByText("medium-slow")).toBeInTheDocument();
        expect(screen.getByText("quadruped")).toBeInTheDocument();
    });

    test("switches to 'Physical Stats' tab and displays content", () => {
        render(<Bio pokemonDetails={mockPokemonDetails} pokemonSpecies={mockPokemonSpecies} characteristicDetails={mockCharacteristicDetails} />);
        
        fireEvent.click(screen.getByText(/Physical Stats/i));

        expect(screen.getByText("Height:")).toBeInTheDocument();
        expect(screen.getByText("0.70 m / 2.30 ft")).toBeInTheDocument();
        expect(screen.getByText("Weight:")).toBeInTheDocument();
        expect(screen.getByText("6.90 kg / 15.21 lbs")).toBeInTheDocument();
        expect(screen.getByText("Capture Rate:")).toBeInTheDocument();
    });

    test("switches to 'Abilities & Egg Group' tab and displays abilities and egg groups", () => {
        render(<Bio pokemonDetails={mockPokemonDetails} pokemonSpecies={mockPokemonSpecies} characteristicDetails={mockCharacteristicDetails} />);
        
        fireEvent.click(screen.getByText(/Abilities & Egg Group/i));

        expect(screen.getByText("overgrow")).toBeInTheDocument();
        expect(screen.getByText("chlorophyll")).toBeInTheDocument();
        expect(screen.getByText("Egg Group")).toBeInTheDocument();
        expect(screen.getByText("monster")).toBeInTheDocument();
        expect(screen.getByText("grass")).toBeInTheDocument();
    });

    test("switches to 'Additional Info' tab and displays characteristic and habitat", () => {
        render(<Bio pokemonDetails={mockPokemonDetails} pokemonSpecies={mockPokemonSpecies} characteristicDetails={mockCharacteristicDetails} />);
        
        fireEvent.click(screen.getByText(/Additional Info/i));

        expect(screen.getByText("Characteristic:")).toBeInTheDocument();
        expect(screen.getByText("Likes to fight")).toBeInTheDocument();
        expect(screen.getByText("Habitat:")).toBeInTheDocument();
        expect(screen.getByText("grassland")).toBeInTheDocument();
    });

    test("renders Growth Rate and Generation on 'Overview' tab if provided", () => {
        render(<Bio pokemonDetails={mockPokemonDetails} pokemonSpecies={mockPokemonSpecies} characteristicDetails={mockCharacteristicDetails} />);

        expect(screen.getByText("Growth Rate:")).toBeInTheDocument();
        expect(screen.getByText("medium-slow")).toBeInTheDocument();
        expect(screen.getByText("Generation:")).toBeInTheDocument();
        expect(screen.getByText("generation-i")).toBeInTheDocument();
    });
});