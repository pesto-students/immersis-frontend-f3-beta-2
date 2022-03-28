import {
    Box,
    Container,
    Grid,
    Card,
    CardHeader,
    makeStyles
} from '@material-ui/core';
import HistoryIcon from '@mui/icons-material/History';
import React, { useEffect, useLayoutEffect } from 'react';
import { Skeleton } from '@mui/material';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSearches } from '../../utils/resource';

const useStyles = makeStyles(() => ({
    cardBack: {
        padding: '5%'
    },
    cardLink: {
        textDecoration: 'none'
    },
    errDiv: {
        margin: 'auto'
    }
}));

function Loading() {
    const classes = useStyles();
    return (
        <>
            {[...Array(12)].map(() => (
                <Grid item sm="3" md="3" xs="12">
                    <Card className={classes.cardBack}>
                        <Skeleton width="60%" />
                    </Card>
                </Grid>
            ))}
        </>
    );
}

function Error({ msg }) {
    const classes = useStyles();
    return <div className={classes.errDiv}>{msg}</div>;
}

function Searches({ search }) {
    const classes = useStyles();

    return (
        <Grid item sm="3" md="3" xs="12">
            <Link to={`/search?q=${search}`} className={classes.cardLink}>
                <Card>
                    <CardHeader avatar={<HistoryIcon />} title={search} />
                </Card>
            </Link>
        </Grid>
    );
}

function History({ loggedIn, allSearches, dispatch }) {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
    }, []);

    document.documentElement.scrollTop = 0;
    useEffect(() => {
        dispatch(fetchSearches());
    }, []);

    let elm;
    if (allSearches.loading) {
        elm = <Loading />;
    } else if (allSearches.error) {
        elm = <Error msg={allSearches.error} />;
    } else if (allSearches.searches.length === 0) {
        elm = <Error msg="No previous search results yet!" />;
    } else {
        elm = (
            <>
                {allSearches.searches.map((search) => (
                    <Searches search={search} />
                ))}
            </>
        );
    }

    return (
        <Box mt={15} sx={{ minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {elm}
                </Grid>
            </Container>
        </Box>
    );
}

function mapStateToProps(state) {
    return { loggedIn: state.auth.loggedIn, allSearches: state.search };
}

const ConnectedHistory = connect(mapStateToProps)(History);

export default ConnectedHistory;
