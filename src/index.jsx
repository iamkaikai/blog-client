import './style.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import App from './components/app';
import { ActionTypes } from './actions';

const store = configureStore({
    reducer: rootReducer,
});

const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: ActionTypes.AUTH_USER });
}

const root = createRoot(document.getElementById('main'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
