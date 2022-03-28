const initiaState = {
    loading: false,
    id: '',
    error: ''
};

function VideoReducer(state = initiaState, action = {}) {
    switch (action.type) {
        case 'FETCH_VIDEO_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_VIDEO_SUCCESS':
            return { loading: false, id: action.payload, error: '' };
        case 'FETCH_VIDEO_ERROR':
            return { loading: false, id: '', error: action.payload };
        default:
            return state;
    }
}

export { VideoReducer };
