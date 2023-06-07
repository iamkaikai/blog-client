/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
    authenticated: false,
};

const authReducer = produce((draft, action) => {
    switch (action.type) {
    case ActionTypes.AUTH_USER:
        draft.authenticated = true;
        break;
    case ActionTypes.DEAUTH_USER:
        draft.authenticated = false;
        break;
    case ActionTypes.AUTH_ERROR:
        draft.authenticated = false;
        break;
    default:
        break;
    }
}, initialState);

export default authReducer;
