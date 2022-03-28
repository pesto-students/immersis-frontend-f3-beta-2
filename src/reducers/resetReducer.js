const initiaState = {
    loading: false,
    msg: '',
    error: ''
};

function ResetReducer(state = initiaState, action = {}) {
    switch (action.type) {
        case 'FETCH_RESET_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_RESET_SUCCESS':
            return { loading: false, msg: action.payload, error: '' };
        case 'FETCH_RESET_ERROR':
            return { loading: false, msg: '', error: action.payload };
        default:
            return state;
    }
}

export { ResetReducer };
