import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, waitForDomChange } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import Menu from '../../src/components/Menu';
import { selectFood } from '../../src/actions';
import { renderWithRedux } from '../../__mocks__/helpers';
import axios from '../../src/api/axiosInstance';

const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

const history = createMemoryHistory({ initialEntries: ['/menu'] });

const dispatch = jest.fn();
const actions = {
  selectFood,
};

actions.selectFood = jest.fn();

describe('<Menu />', () => {
  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('it renders the ', async () => {
    const ui = (
      <Router history={history}>
        <Menu />
      </Router>
    );
    const connectedIndexComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedin: true } } });
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
        {
          food_id: 2,
          food_name: 'yam and egg',
          category_id: 2,
          price: '4000',
          description: 'a different kind of food',
          image: 'https://nice-image.jpg',
          createdAt: '2019-01-18T10:28:03.853Z',
          updatedAt: '2019-01-18T10:28:03.853Z',
        },
      ],
    });
    const { container, getByText } = connectedIndexComponent;
    await waitForDomChange({ container });

    const addToCartBtn = container.querySelector('button#addtocart');
    expect(addToCartBtn).toBeInTheDocument();
    expect(getByText(/Add to cart/i)).toBeInTheDocument();

    fireEvent.click(addToCartBtn);
    await selectFood()(dispatch);
  });
});
