import React from 'react';
import 'jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, waitForElement } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import Signup from '../../../src/components/authentication/Signup';
import { signup } from '../../../src/actions';
import renderWithRedux from '../../../__mocks__/helpers';
import axios from '../../../src/api/axiosInstance';


const axiosMock = new MockAdapter(axios, { delayResponse: 500 });
const dispatch = jest.fn();
const actions = {
  signup,
};

actions.signup = jest.fn();

const history = createMemoryHistory({ initialEntries: ['/signup'] });
history.push = jest.fn();

describe('<Signup />', () => {
  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('it renders the well with the signup form and user signs up ', async () => {
    const ui = (
      <Router history={history}>
        <Signup />
      </Router>
    );

    const connectedLoginComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedIn: false } } });
    const { container, getByPlaceholderText } = connectedLoginComponent;

    const fullName = getByPlaceholderText(/Enter full name here.../i);
    const username = getByPlaceholderText(/Enter username here.../i);
    const email = getByPlaceholderText(/Enter email here.../i);
    const password = getByPlaceholderText(/Enter password here.../i);
    const conPassword = getByPlaceholderText(/Enter password again.../i);
    const signupBtn = container.querySelector('button#submit-signup');


    fireEvent.change(fullName, { target: { value: 'oluwajuwon' } });
    fireEvent.change(username, { target: { value: 'juwonzymann' } });
    fireEvent.change(email, { target: { value: 'randompassworD@gmail.com' } });
    fireEvent.change(password, { target: { value: 'randompassworD' } });
    fireEvent.change(conPassword, { target: { value: 'randompassworD' } });


    const responsePayload = {
      user: { username: 'juwon', userType: 'customer', message: 'sign up successful successful' },
    };
    axiosMock.onPost().replyOnce(200, responsePayload);
    fireEvent.click(signupBtn);
    await signup()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test('it should display an error when the passwords are not the same', async () => {
    const ui = (
      <Router history={history}>
        <Signup />
      </Router>
    );

    const connectedLoginComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedIn: false } } });
    const { getByText, getByPlaceholderText } = connectedLoginComponent;

    const fullName = getByPlaceholderText(/Enter full name here.../i);
    const username = getByPlaceholderText(/Enter username here.../i);
    const email = getByPlaceholderText(/Enter email here.../i);
    const password = getByPlaceholderText(/Enter password here.../i);
    const conPassword = getByPlaceholderText(/Enter password again.../i);


    fireEvent.change(fullName, { target: { value: 'oluwajuwon' } });
    fireEvent.change(username, { target: { value: 'juwonzymann' } });
    fireEvent.change(email, { target: { value: 'randompassworD@gmail.com' } });
    fireEvent.change(password, { target: { value: 'randompasswor' } });
    fireEvent.change(conPassword, { target: { value: 'randomp' } });
    fireEvent.keyUp(conPassword);

    await waitForElement(() => getByText(/The passwords do not match/i));
  });

  test('it should not display passwords are not equal ', async () => {
    const ui = (
      <Router history={history}>
        <Signup />
      </Router>
    );

    const connectedLoginComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedIn: false } } });
    const { queryByText, getByPlaceholderText } = connectedLoginComponent;

    const fullName = getByPlaceholderText(/Enter full name here.../i);
    const username = getByPlaceholderText(/Enter username here.../i);
    const email = getByPlaceholderText(/Enter email here.../i);
    const password = getByPlaceholderText(/Enter password here.../i);
    const conPassword = getByPlaceholderText(/Enter password again.../i);


    fireEvent.change(fullName, { target: { value: 'oluwajuwon' } });
    fireEvent.change(username, { target: { value: 'juwonzymann' } });
    fireEvent.change(email, { target: { value: 'randompassworD@gmail.com' } });
    fireEvent.change(password, { target: { value: 'randompasswor' } });
    fireEvent.change(conPassword, { target: { value: 'randompasswor' } });
    fireEvent.keyUp(conPassword);

    expect(queryByText(/The passwords do not match/i)).not.toBeInTheDocument();
  });

  test('it should not do anything when password fields are empty ', async () => {
    const ui = (
      <Router history={history}>
        <Signup />
      </Router>
    );

    const connectedLoginComponent = renderWithRedux(ui,
      { initialState: { auth: { isLoggedIn: false } } });
    const { queryByText, getByPlaceholderText } = connectedLoginComponent;

    const fullName = getByPlaceholderText(/Enter full name here.../i);
    const username = getByPlaceholderText(/Enter username here.../i);
    const email = getByPlaceholderText(/Enter email here.../i);
    const password = getByPlaceholderText(/Enter password here.../i);
    const conPassword = getByPlaceholderText(/Enter password again.../i);


    fireEvent.change(fullName, { target: { value: 'oluwajuwon' } });
    fireEvent.change(username, { target: { value: 'juwonzymann' } });
    fireEvent.change(email, { target: { value: 'randompassworD@gmail.com' } });
    fireEvent.change(password, { target: { value: '' } });
    fireEvent.change(conPassword, { target: { value: '' } });
    fireEvent.keyUp(conPassword);

    expect(queryByText(/The passwords do not match/i)).not.toBeInTheDocument();
  });
});
