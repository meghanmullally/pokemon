import React, { useRef, useEffect } from "react";
import { AppBar, Toolbar, Grid, Typography, Avatar, AvatarGroup, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { pokemonActions } from "../PokemonSlice";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const searchOptionData = useAppSelector((state) => state.pokemon.searchOptionData);
  const historyData = useAppSelector((state) => state.pokemon.historyData);
  const reverseHistory = [...historyData].reverse();
  const dispatch = useAppDispatch();
  const debounceTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(debounceTimer.current);
  }, []);

  const handleOnChange = (event) => {
    const term = event.target.value.toLowerCase();
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      dispatch(pokemonActions.updateFilterSearch(term));

      const findPokemon = searchOptionData.find(
        (element) => element.name === term
      );

      if (findPokemon) {
        const searchPokemon = { ...findPokemon };
        searchPokemon.searched = true;
        dispatch(pokemonActions.updateHistory(searchPokemon));
        navigate(`/pokemon/${findPokemon.id}`);
      }
    }, 300);
  };

  const resetFilterTerm = () => {
    clearTimeout(debounceTimer.current);
    dispatch(pokemonActions.updateFilterSearch(""));
  };

  const historyAvatars = reverseHistory.map((pokemon) => (
    <Tooltip key={pokemon.name} title={pokemon.name} arrow>
      <NavLink to={`/pokemon/${pokemon.id}`}>
        <Avatar
          className="avatar"
          alt={pokemon.name}
          src={pokemon.sprite}
        />
      </NavLink>
    </Tooltip>
  ));

  return (
    <AppBar position="static">
      <Toolbar className="toolbar">
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <NavLink to="/" onClick={resetFilterTerm}>
              <img src="/pokedex_logo.png" className="pokedex pokedex-hide-mobile" alt="pokedex logo" />
              <img
                className="headerLogos"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/175.svg"
                alt="togepi"
              />
            </NavLink>
          </Grid>
          <Grid item className="pokedex-hide-mobile">
            <NavLink to="/" onClick={resetFilterTerm} className="navLink">
              Pokédex
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink to="/regions" className="navLink">
              Regions
            </NavLink>
          </Grid>
          <Grid item xs>
            {searchOptionData && (
              <div className="searchBar">
                <SearchIcon className="searchIcon" />
                <Search
                  searchOptionData={searchOptionData}
                  onChange={handleOnChange}
                  label="Search for Pokemon"
                />
              </div>
            )}
          </Grid>
          <Grid item className="history-hide-mobile">
              {reverseHistory.length > 0 && (
                <Typography className="recentSearch">
                  Recently Searched...
                </Typography>
              )}
              <AvatarGroup max={10}>
                {historyAvatars}
              </AvatarGroup>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;