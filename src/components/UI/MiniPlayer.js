import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, Skeleton } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/soundcloud';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    playerWrapper: {
        height: 85,
        [theme.breakpoints.down('sm')]: {
            height: 100
        }
    },
    errorMsg: {
        position: 'relative',
        margin: 'auto'
    }
}));

function Loading() {
    const classes = useStyles();
    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 5
            }}
            className={classes.playerWrapper}
        >
            <BottomNavigation sx={{ justifyContent: 'start' }}>
                <Card
                    sx={{
                        width: '100%',
                        height: '100%',
                        boxShadow: 'none'
                    }}
                >
                    <CardHeader
                        avatar={
                            <Skeleton
                                variant="circular"
                                height={35}
                                width={35}
                                animation="wave"
                            />
                        }
                        title={<Skeleton width={100} animation="wave" />}
                        subheader={<Skeleton width={200} animation="wave" />}
                    />
                </Card>
            </BottomNavigation>
        </Paper>
    );
}

function Audio({ url }) {
    const classes = useStyles();
    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 5
            }}
            className={classes.playerWrapper}
        >
            <BottomNavigation sx={{ justifyContent: 'start' }}>
                <ReactPlayer
                    controls
                    playing
                    height={110}
                    width="100vw"
                    url={url}
                />
            </BottomNavigation>
        </Paper>
    );
}

function Error({ msg }) {
    const classes = useStyles();
    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 5
            }}
            className={classes.playerWrapper}
        >
            <BottomNavigation sx={{ justifyContent: 'center' }}>
                <div className={classes.errorMsg}>{msg}</div>
            </BottomNavigation>
        </Paper>
    );
}

function MinPLayer({ currentAudio, dispatch }) {
    const location = useLocation();
    let elm;

    if (
        location.pathname === '/login' ||
        location.pathname === '/signup' ||
        location.pathname === '/forgotPassword' ||
        location.pathname === '/reset'
    ) {
        return null;
    }

    if (currentAudio.loading) {
        elm = <Loading />;
    } else if (currentAudio.error) {
        console.log(currentAudio);
        elm = <Error msg={currentAudio.error} />;
        useEffect(() => {
            const timer = setTimeout(() => {
                dispatch({ type: 'FETCH_AUDIO_ERROR', payload: '' });
            }, 3000);
            return () => {
                clearTimeout(timer);
            };
        });
    } else if (currentAudio.url) {
        elm = <Audio url={currentAudio.url} />;
    } else {
        elm = null;
    }
    return <div>{elm}</div>;
}

function mapStateToProps(state) {
    return { currentAudio: state.audio };
}

const ConnectedMinPLayer = connect(mapStateToProps)(MinPLayer);

export { ConnectedMinPLayer as MinPLayer };
