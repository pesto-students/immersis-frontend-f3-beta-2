import { Grid, Typography } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import colors from '../../colors';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: colors.secondaryColor,
        maxWidth: '100vw',
        padding: '3rem 3rem',
        marginTop: '3rem',
        direction: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            padding: '1rem 1rem',
            marginTop: '1rem',
            direction: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        }
    },
    footerExtend: {
        backgroundColor: colors.secondaryColor,
        maxWidth: '100vw',
        padding: '3rem 3rem 20vh',
        marginTop: '3rem',
        direction: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            padding: '1rem 1rem 15vh',
            marginTop: '1rem',
            direction: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        }
    },
    Heading: {
        color: colors.primaryColor,
        fontSize: '2rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem'
        }
    },
    link: {
        color: colors.whiteColor,
        fontSize: '1.5rem',
        wordWrap: 'break-word',
        [theme.breakpoints.down('md')]: {
            fontSize: '.4rem'
        }
    },
    href: {
        textDecoration: 'none',
        '& h6:hover': {
            color: colors.primaryColor
        }
    },
    mail: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            color: colors.primaryColor
        }
    }
}));

function Footer({ currentAudio }) {
    const classes = useStyles();
    const location = useLocation();

    if (
        location.pathname === '/login' ||
        location.pathname === '/signup' ||
        location.pathname === '/forgotPassword' ||
        location.pathname === '/reset'
    ) {
        return null;
    }
    return (
        <Grid
            container
            className={
                currentAudio.url || currentAudio.error
                    ? classes.footerExtend
                    : classes.footer
            }
        >
            <Grid item spacing={10}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography className={classes.Heading} variant="h5">
                            About Us
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            className={classes.link}
                            variant="subtitle1"
                        >
                            Presenting you Immersis, where you <br /> can find
                            your music, videos and lyrics
                            <br /> all in one place.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item spacing={10}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h5" className={classes.Heading}>
                            Our Company
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Link to="/privacypolicy" className={classes.href}>
                            <Typography
                                className={classes.link}
                                variant="subtitle1"
                            >
                                Privacy and Policy
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/termscondition" className={classes.href}>
                            <Typography
                                className={classes.link}
                                variant="subtitle1"
                            >
                                Terms & Condition
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Typography
                            className={classes.link}
                            variant="subtitle1"
                        >
                            All Rights Reserved
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item spacing={10}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography className={classes.Heading} variant="h5">
                            Contact Us
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            className={classes.link}
                            variant="subtitle1"
                        >
                            Email:{' '}
                            <a
                                href="mailto:officialimmersis@gmail.com"
                                className={classes.mail}
                            >
                                officialimmersis@gmail.com
                            </a>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            className={classes.link}
                            variant="subtitle1"
                        >
                            Phone: +91 7006064XXX
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            className={classes.link}
                            variant="subtitle1"
                        >
                            Location: Delhi Ncr, india
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

function mapStateToProps(state) {
    return { currentAudio: state.audio };
}

const ConnectedFooter = connect(mapStateToProps)(Footer);

export default ConnectedFooter;
