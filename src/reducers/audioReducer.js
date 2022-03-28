const initiaState = {
    loading: false,
    url: '',
    error: ''
};

function AudioReducer(state = initiaState, action = {}) {
    switch (action.type) {
        case 'FETCH_AUDIO_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_AUDIO_SUCCESS':
            return { loading: false, url: action.payload, error: '' };
        case 'FETCH_AUDIO_ERROR':
            return { loading: false, url: '', error: action.payload };
        default:
            return state;
    }
}

export { AudioReducer };
