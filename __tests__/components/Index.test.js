import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { wait, fireEvent, waitForDomChange } from 'react-testing-library';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import Index from '../../src/components/Index';
import reducers from '../../src/reducers';
import renderWithRedux from '../../__mocks__/helpers';
import axios from '../../src/api/axiosInstance';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

createStore(reducers, applyMiddleware(thunk));
const history = createMemoryHistory({ initialEntries: ['/'] });

history.push = jest.fn();

describe('<Index />', () => {
  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('it renders the ', async () => {
    const ui = (
      <Router history={history}>
        <Index />
      </Router>
    );

    const connectedIndexComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedIn: false } } });
    axiosMock.onGet().replyOnce(200, {
      menu: [
        {
          food_id: 1,
          food_name: 'Eba and amala',
          category_id: 2,
          price: '3000',
          description: 'a new kind of food',
          image: 'https://image.jpg',
          createdAt: '2019-01-18T10:28:03.853Z',
          updatedAt: '2019-01-18T10:28:03.853Z',
        },
      ],
    });
    const { container, getByText } = connectedIndexComponent;
    await waitForDomChange({ container });

    const addToCartBtn = container.querySelector('button.blue-bg-colour');
    expect(addToCartBtn).toBeInTheDocument();
    expect(getByText(/Add to cart/i)).toBeInTheDocument();

    fireEvent.click(addToCartBtn);
    wait(() => expect(history.push).toHaveBeenCalledWith('/login'));
  });
});
