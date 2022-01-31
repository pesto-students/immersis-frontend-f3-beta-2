import {
    Box,
    Card,
    CardActions,
    CardHeader,
    Container,
    Grid,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import { Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { connect } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import colors from '../../colors';
import { fetchVideo, fetchAudio } from '../../utils/resource';

const useStyles = makeStyles(() => ({
    // style for Mobile Responsive
    videResponsive: {
        overFlow: 'hidden',
        paddingBottom: ' 90.25%',
        position: 'relative',
        height: 0,
        '& iframe': {
            left: 0,
            top: 0,
            height: '100%',
            width: '100%',
            position: 'absolute'
        }
    },
    icon: {
        backgroundColor: colors.iconColor.background,
        color: colors.iconColor.color,
        margin: '.5rem !important',
        '&:hover': {
            backgroundColor: colors.iconHoverColor.background,
            color: colors.iconHoverColor.color
        }
    },
    linkDiv: {
        display: 'flex',
        alignItems: 'center',
        color: 'red',
        marginBottom: 10
    },
    resultLink: {
        color: 'red'
    },
    ta: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

function Loading() {
    const classes = useStyles();
    return (
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            {localStorage.getItem('recent') ? (
                <Link
                    to={`/search?q=${localStorage.getItem('recent')}`}
                    className={classes.resultLink}
                >
                    <div className={classes.linkDiv}>
                        <ArrowBackIcon />
                        <Typography sx={{ display: 'inline-block' }}>
                            Back to Search Results
                        </Typography>
                    </div>
                </Link>
            ) : null}
            <div className={classes.ta}>
                <Skeleton width="30%" />
                <Skeleton width="10%" />
                <Skeleton
                    variant="rectangular"
                    height={window.screen.height / 2}
                    width={window.screen.width / 1.5}
                />
                <CardActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <Tooltip>
                                <Skeleton
                                    variant="circular"
                                    height={40}
                                    width={40}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip>
                                <Skeleton
                                    variant="circular"
                                    height={40}
                                    width={40}
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                </CardActions>
            </div>
        </Container>
    );
}

function VideoFrame({ videoId, artist, trig, audioTrigger, titleName = '' }) {
    const classes = useStyles();
    const { trigger } = trig;
    return (
        <Container maxWidth="md">
            {localStorage.getItem('recent') ? (
                <Link
                    to={`/search?q=${localStorage.getItem('recent')}`}
                    className={classes.resultLink}
                >
                    <div className={classes.linkDiv}>
                        <ArrowBackIcon />
                        <Typography sx={{ display: 'inline-block' }}>
                            Back to Search Results
                        </Typography>
                    </div>
                </Link>
            ) : null}
            <div>
                <Card>
                    <CardHeader title={titleName} subheader={artist} />
                </Card>
                <div className={classes.videResponsive}>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoId}`}
                        height="50%"
                        width="70%"
                        controls
                    />
                </div>
                <CardActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <Tooltip title="Audio" arrow>
                                <IconButton
                                    name="music"
                                    onClick={audioTrigger}
                                    className={classes.icon}
                                >
                                    <MusicNoteIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Lyrics" arrow>
                                <IconButton
                                    name="lyrics"
                                    onClick={trigger}
                                    className={classes.icon}
                                >
                                    <ReceiptTwoToneIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </CardActions>
            </div>
        </Container>
    );
}

function Video({ videoResult, dispatch }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const titleName = params.get('title');
    const artist = params.get('artist');

    const audioTrigger = () => {
        dispatch(fetchAudio({ title: titleName, artist }));
    };

    function trigger(e) {
        navigate({
            pathname: `/${e.currentTarget.name}`,
            search: `?title=${titleName}&artist=${artist}`
        });
    }

    if (titleName && artist) {
        useEffect(() => dispatch(fetchVideo(`${titleName} ${artist}`)), []);
    } else {
        useEffect(() => navigate('/'), []);
    }

    return (
        <Box mt={15} sx={{ overflowX: 'hidden', minHeight: '100vh' }}>
            {videoResult.loading ? (
                <Loading />
            ) : videoResult.error ? (
                <div className={classes.ta}>
                    <h3>{videoResult.error}</h3>
                </div>
            ) : (
                <VideoFrame
                    videoId={videoResult.id}
                    titleName={titleName}
                    artist={artist}
                    trig={{ trigger }}
                    audioTrigger={audioTrigger}
                />
            )}
        </Box>
    );
}

function mapStateToProps(state) {
    return { videoResult: state.video };
}

const ConnectedVideo = connect(mapStateToProps)(Video);

export default ConnectedVideo;
