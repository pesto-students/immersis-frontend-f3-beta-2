import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import CloseIcon from '@mui/icons-material/Close';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SwitchVideoTwoToneIcon from '@mui/icons-material/SwitchVideoTwoTone';
import { CardHeader, Skeleton, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import colors from '../../colors';
import { fetchLyrics, fetchAudio } from '../../utils/resource';

const useStyles = makeStyles(() => ({
    // style for Mobile Responsive
    linkDiv: {
        display: 'flex',
        alignItems: 'center',
        color: 'red',
        marginBottom: 10
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
        <Grid item xs={12} sm={10} lg={8}>
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
            <Box justifyContent="center">
                <Card variant="outlined">
                    <div>
                        <Skeleton width="30%" />
                        <Skeleton width="10%" />
                    </div>
                    <Skeleton variant="rectangular" height="30vh" />
                    <CardContent
                        style={{
                            fontSize: '10rem',
                            textAlign: 'center'
                        }}
                    >
                        <Skeleton variant="rectangular" height="50vh" />
                    </CardContent>
                </Card>
                <CardActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={1}
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
            </Box>
        </Grid>
    );
}

function SongLyrics({
    artist,
    image,
    lyrics,
    trig,
    audioTrigger,
    copyLyrics,
    titleName = ''
}) {
    const classes = useStyles();
    const { trigger } = trig;
    return (
        <Grid item xs={12} sm={10} lg={8}>
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
            <Box justifyContent="center">
                <Card variant="outlined">
                    <CardHeader
                        avatar={
                            <Avatar>
                                <AssignmentIcon />
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={copyLyrics}>
                                <CopyAllIcon />
                            </IconButton>
                        }
                        title={titleName}
                        subheader={artist}
                    />
                    <CardMedia
                        component="img"
                        height="250vh"
                        image={image}
                        alt="Song Image"
                    />
                    <CardContent
                        style={{
                            backgroundColor: 'rgba(0, 0, 54, 0.8)',
                            fontSize: '10rem',
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            gutterBottom
                            variant="body1"
                            style={{ color: '#fff', whiteSpace: 'pre-line' }}
                        >
                            {lyrics}
                        </Typography>
                    </CardContent>
                </Card>
                <CardActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="flex-start"
                        spacing={10}
                    >
                        <Grid item>
                            <Tooltip title="Video" arrow>
                                <IconButton
                                    name="video"
                                    onClick={trigger}
                                    className={classes.icon}
                                >
                                    <SwitchVideoTwoToneIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Audio" arrow>
                                <IconButton
                                    name="music"
                                    onClick={audioTrigger}
                                    className={classes.icon}
                                >
                                    <MusicNoteIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </CardActions>
            </Box>
        </Grid>
    );
}

function Lyrics({ lyricsResult, dispatch }) {
    const classes = useStyles();
    const [params] = useSearchParams();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

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

    const copyLyrics = () => {
        navigator.clipboard.writeText(lyricsResult.obj.lyrics);
        setOpen(true);
    };

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

    if (titleName && artist) {
        useEffect(
            () => dispatch(fetchLyrics({ title: titleName, artist })),
            []
        );
    } else {
        useEffect(() => navigate('/'), []);
    }

    return (
        <Box mt={15} sx={{ minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {lyricsResult.loading ? (
                        <Loading />
                    ) : lyricsResult.error ? (
                        <div className={classes.ta}>
                            <h3>{lyricsResult.error}</h3>
                        </div>
                    ) : (
                        <SongLyrics
                            titleName={titleName}
                            artist={artist}
                            image={lyricsResult.obj.image}
                            lyrics={lyricsResult.obj.lyrics}
                            trig={{ trigger }}
                            audioTrigger={audioTrigger}
                            copyLyrics={copyLyrics}
                        />
                    )}
                </Grid>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message="Lyrics Copied!"
                    action={action}
                    severity="success"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                />
            </Container>
        </Box>
    );
}

function mapStateToProps(state) {
    return { lyricsResult: state.lyrics };
}

const ConnectedLyrics = connect(mapStateToProps)(Lyrics);

export default ConnectedLyrics;
