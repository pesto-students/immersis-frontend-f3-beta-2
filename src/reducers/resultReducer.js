const initialState = { loading: false, data: [], error: '' };

function ResultReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'FETCH_RESULT_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_RESULT_SUCCESS':
            return { loading: false, data: action.payload, error: '' };
        case 'FETCH_RESULT_FAILED':
            return { loading: false, data: [], error: action.payload };
        default:
            return state;
    }
}

export { ResultReducer };
