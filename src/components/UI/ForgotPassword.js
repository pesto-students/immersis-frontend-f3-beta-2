import {
    CircularProgress,
    Container,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Box, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import colors from '../../colors';
import { Forgot } from '../../utils/auth';

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
        backgroundColor: colors.secondaryColor,
        color: colors.whiteColor,
        margin: '1rem 0',
        '&:hover': {
            backgroundColor: colors.background.hoverButtonColor
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
        color: colors.primaryColor,
        textDecoration: 'none !important'
    },
    msgSuccess: {
        border: 'green solid 2px',
        borderRadius: '7px'
    },
    msgError: {
        border: 'red solid 2px',
        borderRadius: '7px'
    }
}));

function Success({ msg }) {
    const classes = useStyles();
    return (
        <div className={classes.msgSuccess}>
            <Typography>{msg}</Typography>
        </div>
    );
}

function Error({ msg }) {
    const classes = useStyles();
    return (
        <div className={classes.msgError}>
            <Typography>{msg}</Typography>
        </div>
    );
}

function ForgotPassword({ loggedIn, forgot, dispatch }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const { register, handleSubmit, errors } = useForm();

    if (loggedIn) {
        navigate('/');
        return null;
    }

    const forgotSubmit = ({ email }) => {
        dispatch(Forgot(email));
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
                                    <LockOpenIcon />
                                </Avatar>
                                <Typography variant="h4" className={classes.h4}>
                                    {' '}
                                    Forgot Passsword
                                </Typography>
                                <Typography variant="caption">
                                    Please fill this form
                                </Typography>
                                {forgot.msg ? (
                                    <Success msg={forgot.msg} />
                                ) : forgot.error ? (
                                    <Error msg={forgot.error} />
                                ) : null}
                            </Grid>
                            <form onSubmit={handleSubmit(forgotSubmit)}>
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

                                <Button
                                    type="submit"
                                    className={classes.button}
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                >
                                    {forgot.loading ? (
                                        <CircularProgress
                                            color="secondary"
                                            size={25}
                                        />
                                    ) : (
                                        <>Send</>
                                    )}
                                </Button>

                                <Typography>
                                    Don&apos;t you Have an Account?
                                    <Link to="/signup" className={classes.Link}>
                                        &nbsp;Sign Up
                                    </Link>
                                </Typography>
                            </form>
                        </Paper>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
}

function mapStateToProps(state) {
    return { loggedIn: state.auth.loggedIn, forgot: state.forgot };
}

const ConnectedForgotPassword = connect(mapStateToProps)(ForgotPassword);

export default ConnectedForgotPassword;
