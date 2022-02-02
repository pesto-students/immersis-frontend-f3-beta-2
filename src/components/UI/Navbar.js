import { AppBar, Button, InputBase, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ReorderIcon from '@mui/icons-material/Reorder';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams
} from 'react-router-dom';
import { LogOut, IsLoggedIn } from '../../utils/auth';
import { fetchResult } from '../../utils/resource';
import logo from '../../assets/logo.png';
import logoSmall from '../../assets/logo_small.png';
import colors from '../../colors';

const useStyles = makeStyles((theme) => ({
    logo: {
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            width: '12rem',
            height: '3rem',
            margin: '0.1rem',
            padding: '0.3rem'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    logoSmall: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            width: '4rem',
            height: '2.1rem',
            margin: '0'
        }
    },
    Toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: colors.whiteColor,
        borderBottom: `1px solid ${colors.greyWhite}`
    },
    LogInButton: {
        color: colors.primaryColor,
        fontSize: '1.3rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem'
        }
    },
    SignInButton: {
        color: colors.secondaryColor,
        fontSize: '1.3rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem'
        }
    },
    HistoryButton: {
        color: colors.secondaryColor,
        fontSize: '1.1rem',
        '&:hover': {
            backgroundColor: colors.transparent
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem'
        }
    },
    LogoutButton: {
        color: colors.secondaryColor,
        fontSize: '1.1rem',
        '&:hover': {
            backgroundColor: colors.transparent
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem'
        }
    },
    Link: {
        textDecoration: 'none !important'
    },
    Search: {
        display: 'flex',
        alignItems: 'center',
        background: colors.whiteColor,
        borderBottom: `2px solid ${colors.secondaryColor}`,
        borderRadius: 1,
        width: '20%',
        alignContent: 'center',
        '&:hover': {
            borderBottom: `1px solid ${colors.secondaryColor}`
        },
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            width: '30%'
        }
    },
    Buttons: {
        display: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    stack: {
        color: colors.primaryColor,
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        },
        [theme.breakpoints.down('small')]: {
            display: 'block',
            width: '1rem',
            height: '1rem'
        }
    },
    bar: {
        border: `2px solid ${colors.searchColor}`,
        width: '50%',
        padding: '0 2%'
    },
    searchForm: {
        width: '50vw',
        marginLeft: '20%',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10%'
        }
    },
    iconSubmit: {
        backgroundColor: 'hsl(11deg 80% 45%)',
        color: '#fff',
        borderRadius: 0,
        '&:hover': {
            backgroundColor: 'hsl(11deg 80% 45%)',
            color: '#fff',
            borderRadius: 0
        }
    }
}));

function Navbar({ loggedIn, dispatch }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const [input, setInput] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (location.pathname === '/search') {
            const q = params.get('q');
            setInput(q);
        }
    }, []);
    useEffect(() => dispatch(IsLoggedIn()), []);

    const search = (e) => {
        e.preventDefault();
        localStorage.setItem('recent', input);
        if (location.pathname === '/search') dispatch(fetchResult(input));
        navigate({ pathname: 'search', search: `?q=${input}` });
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOut = () => {
        dispatch(LogOut());
        navigate('/login');
    };

    if (
        location.pathname === '/login' ||
        location.pathname === '/signup' ||
        location.pathname === '/forgotPassword' ||
        location.pathname === '/reset'
    ) {
        return (
            <AppBar>
                <Toolbar className={classes.Toolbar}>
                    <Link to="/">
                        <img
                            className={classes.logo}
                            src={logo}
                            alt="Immersis Logo"
                        />
                        <img
                            className={classes.logoSmall}
                            src={logoSmall}
                            alt="Immersis Logo"
                        />
                    </Link>
                </Toolbar>
            </AppBar>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar className={classes.Toolbar}>
                    <Link to="/">
                        <img
                            className={classes.logo}
                            src={logo}
                            alt="Immersis Logo"
                        />
                        <img
                            className={classes.logoSmall}
                            src={logoSmall}
                            alt="Immersis Logo"
                        />
                    </Link>

                    <div>
                        <form className={classes.searchForm}>
                            <InputBase
                                placeholder="Search..."
                                onChange={(e) => setInput(e.target.value)}
                                className={classes.bar}
                                value={input}
                            />
                            <Button
                                type="submit"
                                className={classes.iconSubmit}
                                onClick={search}
                            >
                                <SearchIcon />
                            </Button>
                        </form>
                    </div>

                    {loggedIn ? (
                        <>
                            <Button
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <Avatar src="" />
                            </Button>

                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button'
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <Link to="/history" className={classes.Link}>
                                    <MenuItem onClick={handleClose}>
                                        <Button
                                            size="medium"
                                            variant="text"
                                            className={classes.HistoryButton}
                                        >
                                            History
                                        </Button>
                                    </MenuItem>
                                </Link>

                                <Link to="/login" className={classes.Link}>
                                    <MenuItem onClick={logOut}>
                                        <Button
                                            size="medium"
                                            variant="text"
                                            className={classes.LogoutButton}
                                        >
                                            Log out
                                        </Button>
                                    </MenuItem>
                                </Link>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <div className={classes.Buttons}>
                                <Link to="/login" className={classes.Link}>
                                    <Button
                                        size="medium"
                                        variant="text"
                                        className={classes.LogInButton}
                                    >
                                        Log In
                                    </Button>
                                </Link>
                                <Link to="/signup" className={classes.Link}>
                                    <Button
                                        size="medium"
                                        variant="text"
                                        className={classes.SignInButton}
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <Button
                                    id="fade-button"
                                    aria-controls={
                                        open ? 'fade-menu' : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <ReorderIcon />
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button'
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Link
                                            to="/login"
                                            className={classes.Link}
                                        >
                                            <Button
                                                size="medium"
                                                variant="text"
                                                className={classes.LogInButton}
                                            >
                                                Log In
                                            </Button>
                                        </Link>
                                    </MenuItem>

                                    <MenuItem onClick={handleClose}>
                                        <Link
                                            to="/signup"
                                            className={classes.Link}
                                        >
                                            <Button
                                                size="medium"
                                                variant="text"
                                                className={classes.SignInButton}
                                            >
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

function mapStateToProps(state) {
    return state.auth;
}

const ConnectedNavbar = connect(mapStateToProps)(Navbar);

export default ConnectedNavbar;
