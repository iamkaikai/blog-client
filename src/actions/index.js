import axios from 'axios';

const ROOT_URL = 'https://lab5-api-qdgw.onrender.com/api';

export const ActionTypes = {
    FETCH_All: 'FETCH_POSTS',
    FETCH_DEL: 'FETCH_Delete',
    FETCH_CREATE: 'FETCH_CREATE',
    FETCH_POST: 'FETCH_POST',
    FETCH_UPDATE: 'FETCH_UPDATE',
    AUTH_USER: 'AUTH_USER',
    DEAUTH_USER: 'DEAUTH_USER',
    AUTH_ERROR: 'AUTH_ERROR',
};

export function fetchAll() {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/posts/`).then((response) => {
            dispatch({
                type: ActionTypes.FETCH_All,
                payload: response.data,
            });
        }).catch((error) => {
            console.log('fetch api request failed!');
        });
    };
}

export function createPost(fields) {
    return async (dispatch) => {
        try {
            await axios.post(`${ROOT_URL}/posts/`, fields, { headers: { authorization: localStorage.getItem('token') } });
            const refresh = await axios.get(`${ROOT_URL}/posts/`);
            dispatch({
                type: ActionTypes.FETCH_CREATE,
                payload: refresh.data,
            });
        } catch (error) {
            console.log('create api request failed!');
            console.log(error);
        }
    };
}

export function updatePost(id, fields) {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${ROOT_URL}/posts/${id}`, fields, { headers: { authorization: localStorage.getItem('token') } });
            console.log('update');
            console.log(response.data);
            dispatch({
                type: ActionTypes.FETCH_UPDATE,
                payload: response.data,
            });
        } catch (error) {
            console.log('post fetch api request failed!');
        }
    };
}

export function fetchSinglePost(id) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
            dispatch({
                type: ActionTypes.FETCH_POST,
                payload: response.data,
            });
        }).catch((error) => {
            console.log('post fetch api request failed!');
        });
    };
}

export function deletePost(id) {
    return async (dispatch) => {
        try {
            await axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } });
            try {
                const refresh = await axios.get(`${ROOT_URL}/posts`);
                dispatch({
                    type: ActionTypes.FETCH_DEL,
                    payload: refresh.data,
                });
            } catch (error) {
                console.log('Refresh (GET) request failed:', error);
            }
        } catch (error) {
            console.log('Delete (DELETE) request failed:', error);
        }
    };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
    return {
        type: ActionTypes.AUTH_ERROR,
        message: error,
    };
}

export function signinUser({ email, password }, navigate) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${ROOT_URL}/signin/`, { email, password });
            dispatch({ type: ActionTypes.AUTH_USER });
            localStorage.setItem('token', response.data.token);
            navigate('/');
            console.log(response);
        } catch (error) {
            dispatch(authError(`Sign In Failed: ${error.response.data}`));
            console.log(`sign in error: ${error}`);
        }
    };
}

export function signupUser({ email, password }, navigate) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${ROOT_URL}/signup/`, { email, password });
            dispatch({ type: ActionTypes.AUTH_USER });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            dispatch(authError(`Sign Up Failed: ${error.response.data}`));
            console.log(`sign up error: ${error}`);
        }
    };
}

// deletes token from localstorage
// and deauths
export function signoutUser(navigate) {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({ type: ActionTypes.DEAUTH_USER });
        navigate('/');
    };
}
