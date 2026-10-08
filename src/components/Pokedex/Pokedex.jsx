import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import Header from '../Header/Header';
import { Grid, CircularProgress } from "@mui/material";
import { useAppSelector } from '../../app/hooks';
import "./Pokedex.css";

const PAGE_SIZE = 20;

const Pokedex = ({ searchOptionData }) => {
  const pokemonData = useAppSelector(state => state.pokemon.pokemonData);
  const filterSearch = useAppSelector(state => state.pokemon.filterSearch);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);

  const filteredIds = useMemo(() => {
    if (!pokemonData) return [];
    return Object.keys(pokemonData).filter((pokemonId) => {
      const pokemon = pokemonData[pokemonId];
      const term = filterSearch.toLowerCase();
      const matchesName = pokemon.name.includes(term);
      const matchesId = String(pokemon.id).includes(term);
      const matchesType = pokemon.types?.some(t => t.type.name.includes(term));
      return matchesName || matchesId || matchesType;
    });
  }, [pokemonData, filterSearch]);

  // Reset visible count when search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filterSearch]);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filteredIds.length));
  }, [filteredIds.length]);

  // Observe the sentinel div at the bottom of the list
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: '200px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const visibleIds = filteredIds.slice(0, visibleCount);
  const hasMore = visibleCount < filteredIds.length;

  return (
    <>
      <Header searchOptionData={searchOptionData} />
      {pokemonData !== null ? (
        <>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            className="pokedexContainer"
          >
            {visibleIds.map((pokemonId) => (
              <React.Fragment key={pokemonId}>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={2}>
                  <PokemonCard pokemonId={pokemonId} />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <div ref={sentinelRef} className="sentinelContainer">
            {hasMore && <CircularProgress size={32} />}
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;