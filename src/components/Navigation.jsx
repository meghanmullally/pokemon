import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
// import pokemonTrainerImg from '../img/pokemon-trainer.png';

const pages = ['Home', 'Locations', 'Items'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <img src="data:image/png;base64,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" alt="pokemon ball"></img>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Pokedéx
        
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Pokedéx
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Pokemon Trainer Avatar"
                // src={pokemonTrainerImg}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;