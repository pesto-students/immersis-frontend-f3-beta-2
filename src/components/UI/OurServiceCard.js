import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import colors from '../../colors';

const useStyles = makeStyles(() => ({
    title: {
        color: colors.primaryColor.color
    },
    card: {
        boxShadow: `3px 3px 3px 3px ${colors.greyWhite}`
    }
}));

function OurServiceCard() {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={20}
        >
            <Grid spacing={10}>
                <Box sx={{ my: 5, p: 2 }}>
                    <Card className={classes.card}>
                        <CardHeader
                            title="Lyrics"
                            className={classes.title}
                            align="center"
                        />
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image="https://i.imgur.com/2jou94m.png"
                            />
                            <CardContent>
                                <Typography variant="h6" align="center">
                                    Songs stay with you when you sing along.{' '}
                                    <br />
                                    Follow along with the synchronized lyrics
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            </Grid>
            <Grid spacing={10}>
                <Box
                    sx={{
                        my: 5,
                        p: 2
                    }}
                >
                    <Card className={classes.card}>
                        <CardHeader
                            title="Music"
                            className={classes.title}
                            align="center"
                        />
                        <CardActionArea sx={{ boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                image="https://i.imgur.com/sZ4r356.png"
                            />
                            <CardContent>
                                <Typography variant="h6" align="center">
                                    Listen to the songs you love, and
                                    <br />
                                    discover new music and podcasts.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            </Grid>
            <Grid spacing={10}>
                <Box sx={{ my: 3, p: 1 }}>
                    <Card className={classes.card}>
                        <CardHeader
                            title="Videos"
                            className={classes.title}
                            align="center"
                        />
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image="https://i.imgur.com/x49Akvg.png"
                            />
                            <CardContent>
                                <Typography variant="h6" align="center">
                                    Music is more meaningful when
                                    <br />
                                    You wactch videos as well.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
}
export default OurServiceCard;
