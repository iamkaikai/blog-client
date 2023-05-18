import axios from 'axios';

const ROOT_URL = 'https://lab4-with-lab5-api.onrender.com/api';
const API_KEY = '';

export const ActionTypes = {
    FETCH_All: 'FETCH_POSTS',
    FETCH_DEL: 'FETCH_Delete',
    FETCH_CREATE: 'FETCH_CREATE',
    FETCH_POST: 'FETCH_POST',
    FETCH_UPDATE: 'FETCH_UPDATE',
};

export function fetchAll() {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
            dispatch({
                type: ActionTypes.FETCH_All,
                payload: response.data,
            });
        }).catch((error) => {
            console.log('fetch api request failed!');
        });
    };
}

export function createPost(fields, navigate) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/posts${API_KEY}`, fields).then((response) => {
            const refresh = axios.get(`${ROOT_URL}/posts${API_KEY}`);
            dispatch({
                type: ActionTypes.FETCH_CREATE,
                payload: refresh.data,
            });
        }).catch((error) => {
            console.log('create api request failed!');
        });
    };
}

export function updatePost(id, fields) {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields);
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
            await axios.delete(`${ROOT_URL}/posts/${id}`);
            try {
                const refresh = await axios.get(`${ROOT_URL}/posts${API_KEY}`);
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
