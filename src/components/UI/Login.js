import {
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import colors from '../../colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: `${window.screen.availHeight}px`,
        backgroundImage:
            "linear-gradient(to right bottom,  rgba(0, 0, 54, 0.90),rgba(253, 24, 99, 0.80)), url('https://i.imgur.com/K3wMWeK.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '64px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '55px',
            height: '100vh',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }
    },
    inputRoot: {
        '& .MuiInput-underline:after': {
            borderBottom: colors.border.borderBottom
        },
        '& .MuiInput-underline:hover:before': {
            borderBottom: colors.border.borderBottombefore
        }
    },
    Paper: {
        padding: '30px 20px',
        width: 300,
        margin: '20px auto'
    },
    button: {
        backgroundColor: `${colors.secondaryColor} !important`,
        color: colors.whiteColor,
        margin: '1rem 0',
        '&:hover': {
            backgroundColor: colors.background.hoverButtonColor
        },
        '& .Mui-disabled': {
            color: '#fff !important'
        },
        '& .css-6y6m6y-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root.Mui-disabled':
            {
                color: '#fff !important'
            }
    },

    h4: {
        color: colors.h4.textColor,
        fontWeight: '700'
    },
    Avatar: {
        backgroundColor: colors.iconColorSecondary.background
    },
    label: {
        fontFamily: "'Baloo Da 2', cursive !important"
    },
    Link: {
        color: colors.LinkSecondary.linkColor,
        textDecoration: 'none !important'
    },
    LinkSignUp: {
        color: colors.primaryColor,
        textDecoration: 'none !important'
    }
}));

function Login({ loggedIn, dispatch }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const { register, handleSubmit, errors } = useForm();
    const [open, setOpen] = React.useState(false);
    const baseURL = 'https://api-immersis.herokuapp.com';
    const [message, setmessage] = React.useState('');
    const [loading, setloading] = React.useState(false);

    if (loggedIn) {
        navigate('/');
        return null;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    const onSubmit = (data) => {
        setloading(true);
        axios
            .post(`${baseURL}/auth/login`, data)
            .then((res) => {
                const Response = res.data;
                setloading(false);
                if (Response.success) {
                    document.cookie = `token=${Response.token}; secure=true`;
                    setmessage(Response.message);
                    setOpen(true);
                    dispatch({ type: 'LOG_IN' });
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    setmessage(Response.message);
                    setOpen(true);
                }
            })
            .catch((err) => {
                setloading(false);
                setmessage(err.message);
                setOpen(true);
            });
    };
    return (
        <div className={classes.root}>
            <Box>
                <Container maxWidth="lg">
                    <Grid container>
                        <Paper
                            elevation={20}
                            className={classes.Paper}
                            sx={{ p: 100 }}
                        >
                            <Grid align="center">
                                <Avatar className={classes.Avatar}>
                                    <LockIcon />
                                </Avatar>
                                <Typography variant="h4" className={classes.h4}>
                                    {' '}
                                    Login
                                </Typography>
                                <Typography variant="caption">
                                    Please fill this form
                                </Typography>
                            </Grid>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    className={classes.inputRoot}
                                    fullWidth
                                    inputProps={{
                                        style: {
                                            fontFamily: "'Baloo Da 2', cursive "
                                        }
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: colors.secondaryColor,
                                            fontFamily: "'Baloo Da 2', cursive"
                                        }
                                    }}
                                    label="Email"
                                    margin="normal"
                                    variant="standard"
                                    placeholder="Enter Your Registered Email"
                                    name="email"
                                    inputRef={register({
                                        required: 'Email Is Required'
                                    })}
                                    error={errors.email}
                                    helperText={errors.email?.message}
                                />
                                <TextField
                                    className={classes.inputRoot}
                                    fullWidth
                                    label="Password"
                                    variant="standard"
                                    placeholder="Enter your Password"
                                    margin="normal"
                                    inputProps={{
                                        style: {
                                            fontFamily: "'Baloo Da 2', cursive "
                                        }
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: colors.secondaryColor,
                                            fontFamily: "'Baloo Da 2', cursive"
                                        }
                                    }}
                                    type="password"
                                    name="password"
                                    inputRef={register({
                                        required: 'Password Is Required'
                                    })}
                                    error={errors.password}
                                    helperText={errors.password?.message}
                                />
                                <FormControlLabel
                                    value=""
                                    control={
                                        <Checkbox
                                            name="RememberMe"
                                            inputRef={register()}
                                        />
                                    }
                                    label="Remember Me"
                                    labelPlacement="I accept Terms and Condition"
                                />
                                <Button
                                    type="submit"
                                    className={classes.button}
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                >
                                    {loading ? (
                                        <CircularProgress
                                            color="secondary"
                                            size={25}
                                        />
                                    ) : (
                                        <>Log In</>
                                    )}
                                </Button>
                                <Typography>
                                    <Link
                                        className={classes.Link}
                                        to="/forgotPassword"
                                    >
                                        {' '}
                                        Forgot Password?
                                    </Link>
                                </Typography>
                                <Typography>
                                    Don&apos;t you Have an Account?
                                    <Link
                                        to="/signup"
                                        className={classes.LinkSignUp}
                                    >
                                        &nbsp;Sign Up
                                    </Link>
                                </Typography>
                            </form>
                        </Paper>
                    </Grid>
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message={message}
                        action={action}
                        severity="success"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    />
                </Container>
            </Box>
        </div>
    );
}

function mapStateToProps(state) {
    return state.auth;
}

const ConnectedLogin = connect(mapStateToProps)(Login);

export default ConnectedLogin;
