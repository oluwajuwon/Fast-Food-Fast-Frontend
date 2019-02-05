import React from 'react';
import 'jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, waitForDomChange } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import Checkout from '../../../src/components/presentation/Checkout';
import { orderFoodItems } from '../../../src/actions';
import { renderWithRedux } from '../../../__mocks__/helpers';
import axios from '../../../src/api/axiosInstance';
import cartUtils from '../../../src/utils/cartUtils';


const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

const history = createMemoryHistory({ initialEntries: ['/checkout'] });

const dispatch = jest.fn();
const actions = {
  orderFoodItems,
};

actions.orderFoodItems = jest.fn();

describe('<Checkout />', () => {
  beforeEach(() => {
    const foodItems = [
      {
        food_id: 1,
        food_name: 'Eba and amala',
        category_id: 2,
        price: '3000',
        quantity: '1',
        description: 'a yummy kind of food',
        image: 'https://image.jpg',
        createdAt: '2019-01-18T10:28:03.853Z',
        updatedAt: '2019-01-18T10:28:03.853Z',
      },
    ];

    const foodItemsString = JSON.stringify(foodItems);
    cartUtils.addItemToCart(foodItemsString);
  });

  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);
  afterEach(jest.resetAllMocks);

  let ui = (
    <Router history={history}>
      <Checkout history={history}/>
    </Router>
  );

  test('it updates item quantity ', async () => {
    const connectedIndexComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedIn: true } } });

    const { container } = connectedIndexComponent;
    waitForDomChange({ container });

    const quantityTxt = container.querySelector('input.txt-quantity');
    expect(quantityTxt).toBeInTheDocument();
    fireEvent.change(quantityTxt, { target: { value: '2' } });
    expect(quantityTxt.value).toBe('2');
  });

  test('it renders with placing an order', async () => {
    ui = (
      <Router history={history}>
        <Checkout />
      </Router>
    );
    const connectedIndexComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedin: true } } });

    const { container } = connectedIndexComponent;
    waitForDomChange({ container });

    const placeOrderBtn = container.querySelector('button#orderfood');
    expect(placeOrderBtn).toBeInTheDocument();

    await axiosMock.onPost().replyOnce(200);
    fireEvent.click(placeOrderBtn);

    await orderFoodItems()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test('it places the order successfully ', async () => {
    ui = (
      <Router history={history}>
        <Checkout history={history} />
      </Router>
    );

    const connectedIndexComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedin: true } } });

    const { container } = connectedIndexComponent;
    waitForDomChange({ container });
    const placeOrderBtn = container.querySelector('button#orderfood');
    expect(placeOrderBtn).toBeInTheDocument();

    await axiosMock.onPost().replyOnce(200, {
      success: 'true',
      message: 'Order placed successfully',
      newOrder: {
        food_id: 1,
        food_name: 'yummy',
      },
    });
    fireEvent.click(placeOrderBtn);
    await orderFoodItems()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test('it renders the ', async () => {
    const connectedIndexComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedIn: true } } });

    const { container, queryByText } = connectedIndexComponent;
    waitForDomChange({ container });

    const removeBtn = container.querySelector('button.red-bg-colour');
    expect(removeBtn).toBeInTheDocument();
    fireEvent.click(removeBtn);

    waitForDomChange({ container });
    expect(queryByText(/a yummy kind of food/i)).not.toBeInTheDocument();
  });
});
