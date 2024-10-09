import { render, screen, fireEvent } from "@testing-library/react";
import Moves from "./Moves";

// Create a mock function that can work for Pokémon moves data
const createMockMoves = (moves) => ({
    moves: moves.map((move) => ({
        move: { name: move.name },
        version_group_details: move.methods.map((method) => ({
            move_learn_method: { name: method.name },
            level_learned_at: method.level_learned_at || 0,
        })),
    })),
});

describe("Moves Component", () => {
    const mockMoves = [
        {
            move: { name: "tackle" },
            version_group_details: [
                { move_learn_method: { name: 'level-up' }, level_learned_at: 1 }
            ]
        },
        {
            move: { name: "solar-beam" },
            version_group_details: [
                { move_learn_method: { name: 'machine' } }
            ]
        },
        {
            move: { name: "charm" },
            version_group_details: [
                { move_learn_method: { name: 'egg' } }
            ]
        },
        {
            move: { name: "swagger" },
            version_group_details: [
                { move_learn_method: { name: 'tutor' } }
            ]
        }
    ];

    it("renders Level Up Moves tab and shows moves when clicked", () => {
        render(<Moves moves={mockMoves} />);

        // Ensure the "Level Up Moves" tab is rendered
        expect(screen.getByText(/Level Up Moves/i)).toBeInTheDocument();
        expect(screen.getByText(/tackle/i)).toBeInTheDocument();
    });

    it("renders TM/HM Moves tab and shows moves when clicked", () => {
        render(<Moves moves={mockMoves} />);

        // Click the TM/HM Moves tab
        fireEvent.click(screen.getByText(/TM\/HM Moves/i));

        // Ensure the "TM/HM Moves" tab content is displayed
        expect(screen.getByText(/solar-beam/i)).toBeInTheDocument();
    });

    it("renders Egg Moves tab and shows moves when clicked", () => {
        render(<Moves moves={mockMoves} />);

        // Click the Egg Moves tab
        fireEvent.click(screen.getByText(/Egg Moves/i));
        // Ensure the "Egg Moves" tab content is displayed
        expect(screen.getByText(/charm/i)).toBeInTheDocument();
    });

    it("renders Tutor Moves tab and shows moves when clicked", () => {
        render(<Moves moves={mockMoves} />);

        // Click the Tutor Moves tab
        fireEvent.click(screen.getByText(/Tutor Moves/i));

        // Ensure the "Tutor Moves" tab content is displayed
        expect(screen.getByText(/swagger/i)).toBeInTheDocument();
    });
});
