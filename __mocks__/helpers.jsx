import React from 'react';
import { render } from 'react-testing-library';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../src/reducers';

const renderWithRedux = (
  ui,
  { initialState, store = createStore(reducers, initialState, applyMiddleware(thunk)) } = {},
) => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  store,
});

export default renderWithRedux;
