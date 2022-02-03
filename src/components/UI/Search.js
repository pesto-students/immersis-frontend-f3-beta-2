import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import SwitchVideoTwoToneIcon from '@mui/icons-material/SwitchVideoTwoTone';
import { Container, Skeleton, Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import colors from '../../colors';
import { fetchResult, fetchAudio } from '../../utils/resource';

const useStyles = makeStyles(() => ({
    Typography: {
        color: colors.primaryColor.color
    },
    icon: {
        backgroundColor: colors.iconColor.background,
        color: colors.iconColor.color,
        margin: '.5rem',
        '&:hover': {
            backgroundColor: colors.iconHoverColor.background,
            color: colors.iconHoverColor.color
        }
    },
    results: {
        width: '80vw'
    }
}));

function Loading() {
    return (
        <>
            {[...Array(12)].map(() => (
                <Grid item sm={3}>
                    <Skeleton variant="rectangular" height={120} width={250} />
                    <Skeleton height={30} width={250} />
                    <Skeleton width="50%" />
                    <Skeleton variant="rectangular" height={30} width={250} />
                </Grid>
            ))}
        </>
    );
}

function Results(props) {
    const { image, artist, id, trig, audioTrigger, titleName = '' } = props;
    const { trigger } = trig;
    const classes = useStyles();

    return (
        <Grid item sm={4} lg={3} className={classes.results}>
            <Card>
                <CardActionArea id={id} name="video" onClick={trigger}>
                    <CardMedia component="img" image={image} height="150" />

                    <CardContent>
                        <Tooltip
                            className={classes.Tooltip}
                            arrow
                            title={titleName}
                        >
                            <Typography variant="h5" noWrap>
                                {titleName}
                            </Typography>
                        </Tooltip>
                        <Typography
                            className={classes.Typography}
                            variant="caption"
                            noWrap
                        >
                            {' '}
                            {artist}{' '}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Divider />
                <CardActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="baseline"
                    >
                        <Grid item>
                            <Tooltip
                                className={classes.Tooltip}
                                arrow
                                title="Lyrics"
                            >
                                <IconButton
                                    className={classes.icon}
                                    id={id}
                                    name="lyrics"
                                    onClick={trigger}
                                >
                                    <ReceiptTwoToneIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip arrow title="Audio">
                                <IconButton
                                    className={classes.icon}
                                    id={id}
                                    name="music"
                                    onClick={audioTrigger}
                                >
                                    <MusicNoteIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow title="Video">
                                <IconButton
                                    className={classes.icon}
                                    id={id}
                                    name="video"
                                    onClick={trigger}
                                >
                                    <SwitchVideoTwoToneIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
}

function Search({ searchResults, dispatch }) {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const query = params.get('q');

    const audioTrigger = (e) => {
        searchResults.data.forEach((elm) => {
            if (elm.id.toString() === e.currentTarget.id) {
                dispatch(fetchAudio({ title: elm.title, artist: elm.artist }));
            }
        });
    };

    function trigger(e) {
        searchResults.data.forEach((elm) => {
            if (elm.id.toString() === e.currentTarget.id) {
                navigate({
                    pathname: `/${e.currentTarget.name}`,
                    search: `?title=${elm.title}&artist=${elm.artist}`
                });
                return true;
            }
            return true;
        });
    }

    if (query) {
        useEffect(() => dispatch(fetchResult(query)), []);
    } else {
        useEffect(() => navigate('/'), []);
    }
    return (
        <Box mt={15} sx={{ minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <Grid container>
                    <Box mb={5}>
                        <Grid item>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h6"
                            >
                                Search Result for: &nbsp; &apos;{query}&apos;
                            </Typography>
                        </Grid>
                    </Box>
                </Grid>

                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                >
                    {searchResults.loading ? (
                        <Loading />
                    ) : searchResults.error ? (
                        <h3>{searchResults.error}</h3>
                    ) : (
                        searchResults.data.map((element) => (
                            <Results
                                id={element.id}
                                titleName={element.title}
                                artist={element.artist}
                                image={element.trackImage}
                                trig={{ trigger }}
                                audioTrigger={audioTrigger}
                            />
                        ))
                    )}
                </Grid>
            </Container>
        </Box>
    );
}

function mapStateToProps(state) {
    return { searchResults: state.result };
}

const ConnectedSearch = connect(mapStateToProps)(Search);

export default ConnectedSearch;
