import MockAdapter from 'axios-mock-adapter';
import {
  login,
  signup,
  getMenu,
  selectFood,
  checkCartCount,
  calculateTotal,
  getLoggedinUser,
} from '../../src/actions';
import axios from '../../src/api/axiosInstance';

import authUtils from '../../src/utils/authUtils';

const axiosMock = new MockAdapter(axios);

describe('Redux actions', () => {
  const dispatch = jest.fn();
  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.reset();
  });

  afterAll(authUtils.removeUserToken);

  describe('login', () => {
    test('call dispatch with correct type', async () => {
      const payload = { message: 'welcome', token: 'poop' };
      await axiosMock.onPost().replyOnce(200, payload);
      await login()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: 'LOG_IN', payload });
    });

    test('call dispatch with correct type', async () => {
      const payload = { success: 'fail', message: 'invalid credentials' };
      await axiosMock.onPost().replyOnce(500, payload);
      await login()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: 'LOG_IN_FAIL', payload });
    });
  });

  describe('authenticate user', () => {
    test('call dispatch with correct type', async () => {
      const payload = { currentUser: { user: { username: 'juwonzy' } } };
      await axiosMock.onGet().replyOnce(200, payload);
      await getLoggedinUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: 'AUTHENTICATE_USER', payload: payload.currentUser });
    });

    test('call dispatch with correct type', async () => {
      const payload = { success: 'fail', message: 'can not validate user' };
      await axiosMock.onGet().replyOnce(500, payload);
      await getLoggedinUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: 'AUTHENTICATE_USER_FAIL', payload });
    });
  });

  describe('signup action', () => {
    test('call dispatch with correct type', async () => {
      const payload = { message: 'sign up successful', userToken: 'newToken' };
      await axiosMock.onPost().replyOnce(200, payload.message);
      await signup()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: 'SIGN_UP', payload: payload.message });
    });

    test('call dispatch with correct type', async () => {
      const payload = { errors: { response: { data: 'hmmm' } } };
      await axiosMock.onPost().replyOnce(500, payload);
      await signup()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SIGNUP_FAIL', payload,
      });
    });
  });

  describe('Get all menu items', () => {
    test('call dispatch with correct type', async () => {
      const payload = { status: 'Success', message: 'Menu items retrieved successfully' };
      await axiosMock.onGet().replyOnce(200, payload);
      await getMenu()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: 'GET_MENU', payload });
    });

    test('call dispatch with correct type', async () => {
      const payload = { errors: { response: { data: 'error occured' } } };
      await axiosMock.onGet().replyOnce(500, payload.errors.response.data);
      await getMenu()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'GET_MENU_FAIL',
        payload: payload.errors.response.data,
      });
    });
  });

  describe('Select food', () => {
    test('call dispatch with correct type', async () => {
      await selectFood()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: 'SELECT_MENU' });
    });
  });

  describe('Check cart count', () => {
    test('call dispatch with correct type', async () => {
      const cartItems = [];
      const payload = cartItems.length;
      await checkCartCount()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CART_COUNT',
        payload,
      });
    });
  });

  describe('Calculate total amount', () => {
    test('call dispatch with correct type', async () => {
      const cartItems = [];
      const payload = cartItems.length;
      await calculateTotal()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TOTAL_CALCULATE_SAME',
        payload,
      });
    });
  });
});
