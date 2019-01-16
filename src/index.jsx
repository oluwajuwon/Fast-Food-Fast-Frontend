
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import routes from './routes';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))); // eslint-disable-line
render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('main-app'),
);
