const initiaState = {
    loading: false,
    searches: [],
    error: ''
};

function SearchReducer(state = initiaState, action = {}) {
    switch (action.type) {
        case 'FETCH_SEARCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SEARCH_SUCCESS':
            return { loading: false, searches: action.payload, error: '' };
        case 'FETCH_SEARCH_ERROR':
            return { loading: false, searches: [], error: action.payload };
        default:
            return state;
    }
}

export { SearchReducer };
