import {
    Box,
    Card,
    Container,
    Typography,
    CardContent,
    CardMedia,
    CardActionArea
} from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    Media: {
        width: '100%',
        height: '100%',
        align: 'center'
    }
}));

function NotFound() {
    const classes = useStyles();
    const location = useLocation();

    return (
        <Box mt={15} mb={30}>
            <Container>
                <Card>
                    <CardContent>
                        <Typography
                            variant="headline"
                            component="h2"
                            align="center"
                        >
                            Resource not found at {location.pathname}
                        </Typography>
                    </CardContent>
                    <CardActionArea>
                        <CardMedia
                            className={classes.Media}
                            component="img"
                            image="https://i.imgur.com/GHV9ufi.jpg"
                        />
                    </CardActionArea>
                </Card>
            </Container>
        </Box>
    );
}
export default NotFound;
