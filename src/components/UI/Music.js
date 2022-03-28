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
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import SwitchVideoTwoToneIcon from '@mui/icons-material/SwitchVideoTwoTone';
import { Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/soundcloud';
import { connect } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchAudio } from '../../utils/resource';

const useStyles = makeStyles(() => ({
    // style for Mobile Responsive
    audioResponsive: {
        overFlow: 'hidden',
        paddingBottom: ' 56.25%',
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
    linkDiv: {
        color: 'red'
    },
    resultLink: {
        color: 'red'
    },
    ta: {
        textAlign: 'center'
    }
}));

function Loading() {
    const classes = useStyles();
    return (
        <Container maxWidth="md">
            {localStorage.getItem('recent') ? (
                <Link
                    to={`/search?q=${localStorage.getItem('recent')}`}
                    className={classes.resultLink}
                >
                    <div className={classes.linkDiv}>
                        <Typography>Back to Results</Typography>
                    </div>
                </Link>
            ) : null}
            <div className={classes.ta}>
                <Skeleton width="30%" />
                <Skeleton width="10%" />
                <div className={classes.audioResponsive}>
                    <Skeleton
                        variant="rectangular"
                        height="78vh"
                        width="67vw"
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
            </div>
        </Container>
    );
}

function AudioFrame({ audioURL, artist, trig, titleName = '' }) {
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
                        <Typography>Back to Results</Typography>
                    </div>
                </Link>
            ) : null}
            <div className={classes.ta}>
                <Card>
                    <CardHeader title={titleName} subheader={artist} />
                </Card>
                <div className={classes.audioResponsive}>
                    <ReactPlayer url={audioURL} />
                </div>
                <CardActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <Tooltip title="Video" arrow>
                                <IconButton name="video" onClick={trigger}>
                                    <SwitchVideoTwoToneIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Lyrics" arrow>
                                <IconButton name="lyrics" onClick={trigger}>
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

function Audio({ audioResult, dispatch }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const titleName = params.get('title');
    const artist = params.get('artist');

    function trigger(e) {
        navigate({
            pathname: `/${e.currentTarget.name}`,
            search: `?title=${titleName}&artist=${artist}`
        });
    }

    if (titleName && artist) {
        useEffect(() => dispatch(fetchAudio({ title: titleName, artist })), []);
    } else {
        useEffect(() => navigate('/'), []);
    }

    return (
        <Box mt={15} sx={{ overflowX: 'hidden' }}>
            {audioResult.loading ? (
                <Loading />
            ) : audioResult.error ? (
                <div className={classes.ta}>
                    <h3>{audioResult.error}</h3>
                </div>
            ) : (
                <AudioFrame
                    audioURL={audioResult.url}
                    titleName={titleName}
                    artist={artist}
                    trig={{ trigger }}
                />
            )}
        </Box>
    );
}

function mapStateToProps(state) {
    return { audioResult: state.audio };
}

const ConnectedAudio = connect(mapStateToProps)(Audio);

export default ConnectedAudio;
