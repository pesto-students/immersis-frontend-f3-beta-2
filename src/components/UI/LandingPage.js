import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import OurServiceCard from './OurServiceCard';

const useStyles = makeStyles((theme) => ({
    root: {
        height: `${window.screen.availHeight - 84}px`,
        backgroundImage:
            "linear-gradient(to right bottom,  rgba(0, 0, 54, 0.90),rgba(253, 24, 99, 0.80)), url('https://i.imgur.com/K3wMWeK.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '0px',
        marginBottom: '3rem',
        [theme.breakpoints.down('sm')]: {
            height: `${window.screen.availHeight}px`,
            width: '100vw',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }
    },
    h1: {
        color: '#FD1863 !important',
        fontSize: '10rem',
        position: 'absolute',
        top: `${window.screen.height / 1.85}px`,
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        [theme.breakpoints.down('sm')]: {
            fontSize: '4.5rem',
            top: `${window.screen.height / 1.9}px`
        }
    },
    h6: {
        color: '#fff',
        fontSize: '2.5rem',
        position: 'absolute',
        top: `${window.screen.height / 1.6}px`,
        left: '50%',

        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.1rem',
            top: `${window.screen.height / 1.75}px`
        }
    }
}));

function LandingPage() {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    align="center"
                >
                    <Grid item>
                        <Grid>
                            <Typography
                                variant="h1"
                                component="h1"
                                className={classes.h1}
                            >
                                IMMERSIS
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6"
                                className={classes.h6}
                            >
                                Music, Videos and Lyrics all in one place
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <OurServiceCard />
        </>
    );
}

export default LandingPage;
