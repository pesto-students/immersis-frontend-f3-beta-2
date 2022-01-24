import {
    Container,
    CircularProgress,
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
import { connect } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Reset } from '../../utils/auth';
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
    },
    expired: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '84px auto'
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

function ResetPassword({ loggedIn, reset, dispatch }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const { register, handleSubmit, errors } = useForm();
    const [params] = useSearchParams();
    const expiry = params.get('expiry');
    const token = params.get('token');

    if (loggedIn) {
        navigate('/');
        return null;
    }

    if (Number(expiry) < Date.now() || !token || !expiry) {
        return (
            <div className={classes.expired}>
                <Typography>The Link has been expired</Typography>
                <Link to="/forgotPassword" color="secondary">
                    &nbsp;Generate Again
                </Link>
            </div>
        );
    }

    const submitReset = (data) => {
        dispatch(Reset({ ...data, token }));
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
                                    Reset Passsword
                                </Typography>
                                <Typography variant="caption">
                                    Please fill this form
                                </Typography>
                                {reset.msg ? (
                                    <Success msg={reset.msg} />
                                ) : reset.error ? (
                                    <Error msg={reset.error} />
                                ) : null}
                            </Grid>
                            <form onSubmit={handleSubmit(submitReset)}>
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

                                <Button
                                    type="submit"
                                    className={classes.button}
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                >
                                    {reset.loading ? (
                                        <CircularProgress
                                            color="secondary"
                                            size={25}
                                        />
                                    ) : (
                                        <>Reset</>
                                    )}
                                </Button>

                                <Typography>
                                    Click the Link to Log In?
                                    <Link to="/login" className={classes.Link}>
                                        &nbsp;Log In
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
    return { loggedIn: state.auth.loggedIn, reset: state.reset };
}

const ConnectedResetPassword = connect(mapStateToProps)(ResetPassword);

export default ConnectedResetPassword;