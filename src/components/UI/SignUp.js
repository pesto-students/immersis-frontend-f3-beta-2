import {
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    FormHelperText,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
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
        height: `${window.screen.height}px`,
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
            borderBottom: `2px solid ${colors.secondColor}`
        },
        '& .MuiInput-underline:hover:before': {
            borderBottom: `2px solid ${colors.secondColor} !important`
        }
    },
    Paper: {
        padding: '30px 20px',
        width: 300,
        margin: 'auto'
    },
    button: {
        backgroundColor: colors.secondaryColor,
        color: colors.whiteColor,
        margin: '1rem 0',
        '&:hover': {
            backgroundColor: `${colors.background.hoverButtonColor} !important`
        }
    },
    h4: {
        color: colors.secondaryColor,
        fontWeight: '700'
    },
    Avatar: {
        backgroundColor: `${colors.primaryColor} !important`
    },
    LinkSignIn: {
        color: colors.primaryColor,
        textDecoration: 'none !important'
    }
}));

function SignUp({ loggedIn, dispatch }) {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [loading, setloading] = React.useState(false);
    const navigate = useNavigate();

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

    const baseURL = 'https://api-immersis.herokuapp.com';
    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            setMessage("Password didn't match");
            setOpen(true);
            return;
        }
        const toSend = { ...data };
        delete toSend.confirmPassword;
        setloading(true);
        axios
            .post(`${baseURL}/auth`, toSend)
            .then((res) => {
                const Response = res.data;
                setloading(false);
                if (Response.success) {
                    document.cookie = `token=${Response.token}; secure=true`;
                    dispatch({ type: 'LOG_IN' });
                    setMessage(Response.message);
                    setOpen(true);
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    setMessage(Response.message);
                    setOpen(true);
                }
            })
            .catch((err) => {
                setloading(false);
                setMessage(err.message);
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
                                    Sign Up
                                </Typography>
                                <Typography variant="caption">
                                    Please fill this form
                                </Typography>
                            </Grid>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* UserName Field */}
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
                                    label="First Name"
                                    margin="normal"
                                    variant="standard"
                                    placeholder="Enter Your UserName"
                                    name="firstName"
                                    inputRef={register({
                                        required: 'First Name is Required'
                                    })}
                                    error={errors.firstName}
                                    helperText={errors.firstName?.message}
                                    type="text"
                                />
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
                                    label="Last Name"
                                    margin="normal"
                                    variant="standard"
                                    placeholder="Enter Your UserName"
                                    name="lastName"
                                    inputRef={register({
                                        required: 'Last Name is Required'
                                    })}
                                    error={errors.lastName}
                                    helperText={errors.lastName?.message}
                                    type="text"
                                />

                                {/* Email field */}
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
                                    variant="standard"
                                    margin="normal"
                                    label="Email"
                                    placeholder="name@domain.com"
                                    name="email"
                                    type="email"
                                    inputRef={register({
                                        required: 'Email is Required'
                                    })}
                                    error={errors.email}
                                    helperText={errors.email?.message}
                                />

                                {/* Password Field */}
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
                                    name="password"
                                    inputRef={register({
                                        required: 'Password is Required',
                                        minLength: {
                                            value: 8,
                                            message:
                                                'Password must be equal or greater than 8 characters'
                                        }
                                    })}
                                    error={errors.password}
                                    helperText={errors.password?.message}
                                    type="password"
                                />

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
                                    margin="normal"
                                    placeholder="Confirm Password"
                                    variant="standard"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    inputRef={register({
                                        required: 'Confirm Password is required'
                                    })}
                                    error={errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                    type="password"
                                />
                                <FormControl error={Boolean(errors.tnc)}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="tnc"
                                                inputRef={register({
                                                    required:
                                                        'Please Agree Our Terms And Condition'
                                                })}
                                            />
                                        }
                                        label="I accept terms and condition"
                                    />
                                    <FormHelperText>
                                        {errors.tnc?.message}
                                    </FormHelperText>
                                </FormControl>

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
                                        <>Sign Up</>
                                    )}
                                </Button>
                                <Typography>
                                    Already Have an Account?
                                    <Link
                                        to="/login"
                                        className={classes.LinkSignIn}
                                    >
                                        &nbsp;Log In
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

const ConnectedSignUp = connect(mapStateToProps)(SignUp);

export default ConnectedSignUp;
