import { combineReducers } from '@reduxjs/toolkit';
import fetchAll from './postsAllReducer';
import delPost from './delPostReducer';
import createPost from './createPostReducer';
import fetchSinglePost from './postReducer';

const ReducerAll = combineReducers({
    posts: fetchAll,
    del: delPost,
    create: createPost,
    post: fetchSinglePost,
});

export default ReducerAll;
