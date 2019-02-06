import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, waitForDomChange } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import OrderHistory from '../../src/components/OrderHistory';
import { deleteOrder } from '../../src/actions';
import renderWithRedux from '../../__mocks__/helpers';
import axios from '../../src/api/axiosInstance';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

const history = createMemoryHistory({ initialEntries: ['/menu'] });

const dispatch = jest.fn();
const actions = {
  deleteOrder,
};

actions.deleteOrder = jest.fn();

describe('<OrderHistory />', () => {
  beforeEach(() => {
    const items = JSON.stringify([
      {
        food_id: 1,
        food_name: 'Bread and sauce',
        price: '5500',
        quantity: 1,
      },
    ]);

    axiosMock.onGet().replyOnce(200, {
      success: true,
      message: 'orders retrieved successfully',
      myOrders: [
        {
          order_id: 1,
          food_items: items,
          user_id: 2,
          amount: '3000',
          order_status: 'a new kind of food',
          decline_reason: '',
          created_at: '2019-01-18T10:28:03.853Z',
          updated_at: '2019-01-18T10:28:03.853Z',
        },
      ],
    });
  });

  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('it retrieves the user\'s orders', async () => {
    const ui = (
      <Router history={history}>
        <OrderHistory />
      </Router>
    );
    const connectedHistoryComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedin: true, user: { userId: 2, newUser: { username: 'jay' } } } } });
    const { container } = connectedHistoryComponent;
    await waitForDomChange({ container });

    const showFoodItemsBtn = container.querySelector('button#showitemsBtn');
    expect(showFoodItemsBtn).toBeInTheDocument();

    fireEvent.click(showFoodItemsBtn);
    waitForDomChange({ container });

    const modalCloseBtn = container.querySelector('button.modal-btn');
    expect(modalCloseBtn).toBeInTheDocument();

    fireEvent.click(modalCloseBtn);
  });

  test('it retrieves the user\'s orders', async () => {
    const ui = (
      <Router history={history}>
        <OrderHistory />
      </Router>
    );
    const connectedHistoryComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedin: true, user: { userId: 2, newUser: { username: 'jay' } } } } });
    const { container } = connectedHistoryComponent;
    await waitForDomChange({ container });

    const deleteOrderBtn = container.querySelector('button#deletebtn');
    expect(deleteOrderBtn).toBeInTheDocument();

    fireEvent.click(deleteOrderBtn);
    waitForDomChange({ container });

    const confirmDeleteBtn = container.querySelector('button#confirm-delete');
    expect(confirmDeleteBtn).toBeInTheDocument();

    fireEvent.click(confirmDeleteBtn);
    await deleteOrder()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
