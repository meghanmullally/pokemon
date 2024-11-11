import React from "react";
import { AppBar, Toolbar, Grid, Typography, Avatar, AvatarGroup, Tooltip, Hidden } from "@mui/material";
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

  const handleOnChange = (event) => {
    const term = event.target.value.toLowerCase();
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
  };

  const resetFilterTerm = () => {
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
              <Hidden mdDown>
                <img src="/pokedex_logo.png" className="pokedex" alt="pokedex logo" />
              </Hidden>
              <img
                className="headerLogos"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/175.svg"
                alt="togepi"
              />
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
          <Grid item>
            <Hidden mdDown>
              {reverseHistory.length > 0 && (
                <Typography className="recentSearch">
                  Recently Searched...
                </Typography>
              )}
              <AvatarGroup max={10}>
                {historyAvatars}
              </AvatarGroup>
            </Hidden>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;