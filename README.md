# Pokédex App

A Pokémon encyclopedia built with React and Redux, pulling live data from the [PokéAPI](https://pokeapi.co/). Browse all 1010 Pokémon, search by name, type, or Pokédex number, and explore detailed profiles with stats, moves, and evolution chains.

**Deployment**: [Pokémon App](https://poketrainercentral.netlify.app/)

---

## Features

- **Pokédex Grid** — Browse all 1010 Pokémon with infinite scroll lazy loading. Cards use radial gradients derived from each Pokémon's type(s), blending two type colors for dual-type Pokémon.

- **Smart Search** — Debounced search filters the grid by name, type, or Pokédex number in real time. Includes an autocomplete dropdown with a "Latest Searches" history group.

- **Detailed Pokémon Profiles** — Each profile includes:
  - Official artwork sprite
  - Type badges with icons
  - Base stat bars with per-stat color coding
  - Tabbed bio section (overview, physical stats, abilities, additional info)
  - Full move list organized by category (Level Up, TM/HM, Egg, Tutor) with scrollable tabs
  - Evolution chain with correct branching support for split evolutions (e.g. Eevee's 8 eeveelutions displayed in a grid, Gloom → Vileplume/Bellossom displayed as branches)

- **Search History** — Recently viewed Pokémon appear as avatar chips in the header for quick navigation.

- **Responsive Design** — Layouts adapt across desktop, tablet, and mobile breakpoints.

---

## Technical Highlights

- **Redux Toolkit** for global state — Pokémon data, search options, filter term, and history are all managed in a single slice with clean reducer actions.

- **Branched evolution tree** — The PokéAPI returns evolution chains as a recursive tree structure. Rather than flattening it into a linear array (which loses branch information), the app builds and renders a proper tree, correctly handling Pokémon with multiple evolution paths.

- **Infinite scroll** — Uses the browser's `IntersectionObserver` API to lazily reveal 20 Pokémon at a time as the user scrolls, keeping the initial render fast despite 1010 total entries.

- **Debounced search** — Filter dispatches to Redux are debounced at 300ms so the card grid only re-renders after the user stops typing, preventing lag on large datasets.

- **Type-based radial gradients** — Card backgrounds are generated dynamically using each Pokémon's type data. Dual-type Pokémon get a radial gradient blending both type colors; single-type Pokémon get a centered glow effect.

---

## Tech Stack

`React` `Redux Toolkit` `React Router` `Material UI` `PokéAPI` `JavaScript`

---

## Run Locally

1. Clone the repository

```bash
git clone https://github.com/meghanmullally/pokemon.git
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

4. Open `http://localhost:3000` in your browser

---

## Future Ideas

- **Trainer Profiles** — Save your favourite Pokémon and track which ones you've caught
- **Catch Feature** — Mark Pokémon as caught and build out your personal Pokédex
- **Type Matchup Chart** — Show offensive and defensive type effectiveness on each profile
- **Items & Locations** — Expand beyond Pokémon to cover in-game items and locations

---

## Credits

- Pokémon data provided by [PokéAPI](https://pokeapi.co/)
- Type icons and sprites via [PokeAPI sprites](https://github.com/PokeAPI/sprites)
- Pokémon icon by [Icons8](https://icons8.com/)
