import axios from 'axios';

const baseURL = 'https://api-immersis.herokuapp.com';

const IsLoggedIn = () => {
    return async (dispatch) => {
        const options = {
            url: `${baseURL}/auth/loggedin`,
            method: 'GET'
        };
        try {
            const resp = await axios(options);
            if (resp.data.csrfToken) {
                document.cookie = `csrfToken=${resp.data.csrfToken}`;
            }
            dispatch({ type: resp.data.status ? 'LOG_IN' : 'LOG_OUT' });
        } catch (err) {
            console.log(err.message);
        }
    };
};

const LogOut = () => {
    return async (dispatch) => {
        await axios({
            url: `${baseURL}/auth/logout`,
            method: 'GET'
        });
        document.cookie =
            'token=; secure=true; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        dispatch({ type: 'LOG_OUT' });
    };
};

const Forgot = (email) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_FORGOT_REQUEST' });
        const options = {
            url: `${baseURL}/auth/forgot`,
            method: 'POST',
            data: { email }
        };
        try {
            const resp = await axios(options);
            if (resp.data.success) {
                dispatch({
                    type: 'FETCH_FORGOT_SUCCESS',
                    payload: resp.data.message
                });
            } else {
                dispatch({
                    type: 'FETCH_FORGOT_ERROR',
                    payload: resp.data.message
                });
            }
        } catch (err) {
            dispatch({ type: 'FETCH_FORGOT_ERROR', payload: err.message });
        }
    };
};

const Reset = ({ token, password, confirmPassword }) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_RESET_REQUEST' });
        const options = {
            url: `${baseURL}/auth/reset/${token}`,
            method: 'POST',
            data: { password, confirmPassword }
        };
        try {
            const resp = await axios(options);
            if (resp.data.success) {
                dispatch({
                    type: 'FETCH_RESET_SUCCESS',
                    payload: resp.data.message
                });
            } else {
                dispatch({
                    type: 'FETCH_RESET_ERROR',
                    payload: resp.data.message
                });
            }
        } catch (err) {
            dispatch({ type: 'FETCH_RESET_ERROR', payload: err.message });
        }
    };
};

export { IsLoggedIn, LogOut, Forgot, Reset };
