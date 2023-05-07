// eslint-disable-next-line import/no-extraneous-dependencies
import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
    all: [],
    current: {},
};

const postsReducer = produce((draft, action) => {
    switch (action.type) {
    case ActionTypes.FETCH_All:
        // eslint-disable-next-line no-param-reassign
        draft.all = action.payload;
        break;
    default:
        break;
    }
}, initialState);

export default postsReducer;
