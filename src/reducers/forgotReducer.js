const initiaState = {
    loading: false,
    msg: '',
    error: ''
};

function ForgotReducer(state = initiaState, action = {}) {
    switch (action.type) {
        case 'FETCH_FORGOT_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_FORGOT_SUCCESS':
            return { loading: false, msg: action.payload, error: '' };
        case 'FETCH_FORGOT_ERROR':
            return { loading: false, msg: '', error: action.payload };
        default:
            return state;
    }
}

export { ForgotReducer };
