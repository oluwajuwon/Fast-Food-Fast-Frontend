
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reducers from './reducers';

import Routes from './routes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;// eslint-disable-line
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
render(
  <Provider store={store}>
    <ToastContainer />
    <Routes />
  </Provider>,
  document.getElementById('main-app'),
);
