import React from 'react';
import 'jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import Login from '../../../src/components/authentication/Login';
import { login } from '../../../src/actions';
import renderWithRedux from '../../../__mocks__/helpers';
import axios from '../../../src/api/axiosInstance';


const axiosMock = new MockAdapter(axios, { delayResponse: 500 });
const dispatch = jest.fn();
const actions = {
  login,
};

actions.login = jest.fn();

const history = createMemoryHistory({ initialEntries: ['/login'] });
history.push = jest.fn();

describe('<Login />', () => {
  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('it renders the ', async () => {
    const ui = (
      <Router history={history}>
        <Login />
      </Router>
    );

    const connectedLoginComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedIn: false } } });
    const { container, getByPlaceholderText } = connectedLoginComponent;

    const email = getByPlaceholderText(/Enter email here.../i);
    const password = getByPlaceholderText(/Enter password here.../i);
    const loginBtn = container.querySelector('button#submit-login');


    fireEvent.change(email, { target: { value: 'dummyemail@gmail.com' } });
    fireEvent.change(password, { target: { value: 'randompassworD' } });

    const responsePayload = {
      user: { username: 'juwon', userType: 'customer', message: 'sign in successful' },
    };
    axiosMock.onPost().replyOnce(200, responsePayload);
    fireEvent.click(loginBtn);
    await login()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
