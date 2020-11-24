import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { Provider } from 'react-redux';

import websocketMiddleware from './store/middleware/WebsocketMiddleware';
import configReducer from './store/reducer/ConfigReducer';
import menuReducer from './store/reducer/MenuReducer';
import messageReducer from './store/reducer/MessageReducer';
import logReducer from './store/reducer/LogReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    configReducer,
    menuReducer,
    messageReducer,
    logReducer,
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(websocketMiddleware)),
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
