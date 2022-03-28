const initiaState = {
    loading: false,
    obj: {},
    error: ''
};

function LyricsReducer(state = initiaState, action = {}) {
    switch (action.type) {
        case 'FETCH_LYRICS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_LYRICS_SUCCESS':
            return { loading: false, obj: action.payload, error: '' };
        case 'FETCH_LYRICS_ERROR':
            return { loading: false, obj: {}, error: action.payload };
        default:
            return state;
    }
}

export { LyricsReducer };
