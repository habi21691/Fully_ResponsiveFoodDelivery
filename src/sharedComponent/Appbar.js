import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext';

export default function Home() {

    const { user, setLog, setUser ,setCookie} = useContext(AuthContext);

 let pages = [];
 

 if(user.role === "User" ){
     pages = [
        {
            name: 'Home',
            link: '/Searchbar'
        },
        {
            name: 'Menu',
            link: '/menu'
        },
       
        {
            name: 'Contact',
            link: '/Contact'
        }
    ];
 }
 else if(user.role === "admin"){
    pages = [
        {
            name: 'Admin_Dashboard',
            link: '/Admin_dashboard'
        },

        {
            name: 'Orders',
            link: '/OrderView'
        },
        {
            name: 'Add_Food',
            link: '/AddToFoodlist'
        }
    ]
 }
 else if(user.role === "Delivery"){
 pages =[
    user.username === "deliver1" ?
         {
             name:'Task',
             link: '/task'
         } :
         {
            name: 'Task2',
            link: '/task'
         }
         
    ] 
    
 }
 

    const settings = user.role === "admin" ? [
        {
            name: 'profile',
            link: '/profile'
        },
        {
            name: 'Logout',
            link:'/'

        }

    ] : [
        {
            name: 'Logout',
            link:'/'

        }
    ];

    const navigator = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {

        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar variant="dense" >
                    <RoomServiceOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,fontSize:40 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        textTransform={'none'}
                        component="a"
                        href="/"
                        sx={{
                            mr: 50,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            // letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Food Delivery
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
                                <MenuItem  key={page.name} onClick={() => {
                                    navigator(page.link);
                                    handleCloseNavMenu();
                                }

                                }>
                                    <Typography textAlign="center" textTransform={'none'}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <RoomServiceOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1,fontSize:30 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        textTransform={'none'}
                        component="a"
                        href=""
                        sx={{
                            mr: 1,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            // letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Food Delivery
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mr: 30 }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => {
                                    navigator(page.link)
                                    handleCloseNavMenu();
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton size='small' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                            {settings.map((setting) => {
                                return (
                                    <MenuItem key={setting.name} onClick={() => {
                                        if (setting.name === "Logout"){
                                            setLog(false)
                                            setUser({})
                                            setCookie('token',"" , { path: '/' });
                                            navigator('/');
                                        }
                                          
                                        else{

                                            navigator(setting.link);
                                        }
                                        handleCloseUserMenu();
                                    }}>
                                        <Typography textAlign="center" textTransform={'none'}>{setting.name}</Typography>
                                    </MenuItem>
                                )
                            })}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>

        </AppBar>

    );

} 
