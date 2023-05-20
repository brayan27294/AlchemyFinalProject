import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button,Tooltip, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { resetConfigState } from '../redux/reducers/configReducer';

const certifierPages = ['Certifications', 'NFT'];
const clientPages = ['Certifications'];
const settings = ['Logout'];

const Header = () => {
    const { isAuthenticated, userName, role } = useSelector((state: RootState) => state.config);
    const [openMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        setOpenMenu(false);
        dispatch(resetConfigState());
    };

    const pages = role === 'certifier' ? certifierPages : (role === 'client' ? clientPages : []);

    return (
        <AppBar position='static'>
            <Container sx={{minWidth: '1'}}>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        href='/'
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
                        APP
                    </Typography>

                    {isAuthenticated && <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size='large'
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        onClick={handleOpenNavMenu}
                        color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                        id='menu-appbar'
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
                            <Typography textAlign='center'>{page}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>}
                    <Typography
                        variant='h5'
                        noWrap
                        component='a'
                        href=''
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
                        APP
                    </Typography>
                    {isAuthenticated && <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page}
                        </Button>
                        ))}
                    </Box>}

                    {isAuthenticated && <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Open settings'>
                        <IconButton onClick={()=>setOpenMenu(true)} sx={{ p: 0 }}>
                            <Avatar alt={userName} src='/static/images/avatar/2.jpg' />
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id='menu-appbar'
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openMenu}
                        onClose={()=>setOpenMenu(false)}
                        >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleLogout}>
                            <Typography textAlign='center'>{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>);
}
export default Header;
