import axios from 'axios';

const baseURL = 'https://api-immersis.herokuapp.com';

const fetchResult = (query) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_RESULT_REQUEST' });
        const options = {
            url: `${baseURL}/resource/search?q=${query}`,
            method: 'GET'
        };
        try {
            const resp = await axios(options);
            if (resp.data.data) {
                dispatch({
                    type: 'FETCH_RESULT_SUCCESS',
                    payload: resp.data.data
                });
            } else {
                dispatch({
                    type: 'FETCH_RESULT_FAILED',
                    payload: 'No matching results found!'
                });
            }
        } catch (error) {
            dispatch({ type: 'FETCH_RESULT_FAILED', payload: error.message });
        }
    };
};

const fetchVideo = (query) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_VIDEO_REQUEST' });

        const options = {
            url: `${baseURL}/resource/video?q=${query}`,
            method: 'GET'
        };

        try {
            const resp = await axios(options);
            if (resp.data.data) {
                dispatch({
                    type: 'FETCH_VIDEO_SUCCESS',
                    payload: resp.data.data.videoId
                });
            } else {
                dispatch({
                    type: 'FETCH_VIDEO_ERROR',
                    payload: 'No matching video found!'
                });
            }
        } catch (err) {
            dispatch({ type: 'FETCH_VIDEO_ERROR', payload: err.message });
        }
    };
};

const fetchAudio = ({ title, artist }) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_AUDIO_REQUEST' });

        const options = {
            url: `${baseURL}/resource/audio?title=${title}&artist=${artist}`,
            method: 'GET'
        };

        try {
            const resp = await axios(options);
            if (resp.data.data) {
                dispatch({
                    type: 'FETCH_AUDIO_SUCCESS',
                    payload: resp.data.data.url
                });
            } else {
                dispatch({
                    type: 'FETCH_AUDIO_ERROR',
                    payload: 'No matching audio found'
                });
            }
        } catch (err) {
            dispatch({ type: 'FETCH_AUDIO_ERROR', payload: err.message });
        }
    };
};

const fetchLyrics = ({ title, artist }) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_LYRICS_REQUEST' });

        const options = {
            url: `${baseURL}/resource/lyrics?title=${title}&artist=${artist}`,
            method: 'GET'
        };

        try {
            const resp = await axios(options);
            if (resp.data.data) {
                dispatch({
                    type: 'FETCH_LYRICS_SUCCESS',
                    payload: resp.data.data
                });
            } else {
                dispatch({
                    type: 'FETCH_LYRICS_ERROR',
                    payload: 'No matching lyrics found!'
                });
            }
        } catch (err) {
            dispatch({ type: 'FETCH_LYRICS_ERROR', payload: err.message });
        }
    };
};

const fetchSearches = () => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_SEARCH_REQUEST' });

        const options = {
            url: `${baseURL}/resource/searchHistory`,
            method: 'GET'
        };

        try {
            const resp = await axios(options);
            if (resp.data.success) {
                dispatch({
                    type: 'FETCH_SEARCH_SUCCESS',
                    payload: resp.data.searchHistory
                });
            } else {
                dispatch({
                    type: 'FETCH_SEARCH_ERROR',
                    payload: resp.data.message
                });
            }
        } catch (err) {
            dispatch({ type: 'FETCH_SEARCH_ERROR', payload: err.message });
        }
    };
};

export { fetchResult, fetchVideo, fetchAudio, fetchLyrics, fetchSearches };
