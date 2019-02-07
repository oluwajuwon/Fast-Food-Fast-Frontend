import jwt from 'jsonwebtoken';
import axiosInstance from '../api/axiosInstance';
import authUtils from '../utils/authUtils';
import cartUtils from '../utils/cartUtils';

export const login = userdata => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/login', userdata);
    authUtils.saveUserToken(response.data.userToken);
    authUtils.saveUserData(response.data);
    dispatch({
      type: 'LOG_IN',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'LOG_IN_FAIL',
      payload: error.response.data,
    });
  }
};

export const getLoggedinUser = () => {
  const userToken = authUtils.getUserToken();
  const decodedToken = jwt.decode(userToken, { complete: true });
  const dateNow = new Date();
  if (decodedToken.payload.exp < dateNow.getTime() / 1000) {
    return ({ type: 'AUTHENTICATE_USER_FAIL', payload: 'please log in' });
  }
  const user = JSON.parse(authUtils.getUserData());
  return ({ type: 'AUTHENTICATE_USER', payload: user });
};

export const logoutUser = () => async (dispatch) => {
  authUtils.removeUserToken();
  authUtils.removeUserData();
  cartUtils.removeCartItems();
  dispatch({ type: 'LOGOUT' });
};

export const signup = userdata => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/signup', userdata);
    authUtils.saveUserToken(response.data.userToken);
    authUtils.saveUserData(response.data);
    dispatch({
      type: 'SIGN_UP',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'SIGNUP_FAIL',
      payload: error.response.data,
    });
  }
};

export const getMenu = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/menu');
    dispatch({
      type: 'GET_MENU',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_MENU_FAIL',
      payload: error.response.data,
    });
  }
};

export const selectFood = () => async (dispatch) => {
  dispatch({
    type: 'SELECT_MENU',
  });
};

export const checkCartCount = () => (dispatch) => {
  const cartItemsCount = cartUtils.getCartItems() ? JSON.parse(cartUtils.getCartItems()).length : 0;
  dispatch({ type: 'CART_COUNT', payload: cartItemsCount });
};

export const calculateTotal = () => (dispatch) => {
  const cartItems = cartUtils.getCartItems() ? JSON.parse(cartUtils.getCartItems()) : [];
  let totalAmount = 0;
  if (cartItems && cartItems.length < 1) {
    dispatch({ type: 'TOTAL_CALCULATE_SAME', payload: totalAmount });
  } else if (cartItems && cartItems.length > 0) {
    cartItems.forEach((food) => {
      totalAmount += food.price * food.quantity;
    });
    dispatch({ type: 'TOTAL_CALCULATE', payload: totalAmount });
  }
};

export const orderFoodItems = foodItems => async (dispatch) => {
  try {
    const userToken = authUtils.getUserToken();
    const response = await axiosInstance.post('/orders', foodItems, { headers: { 'x-access-token': userToken } });
    dispatch({ type: 'ORDER_FOOD', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ORDER_FOOD_FAIL', payload: error });
  }
};

export const getOrderHistory = userId => async (dispatch) => {
  try {
    const userToken = authUtils.getUserToken();
    const { data } = await axiosInstance.get(`/users/${userId}/orders`, { headers: { 'x-access-token': userToken } });
    dispatch({ type: 'ORDER_HISTORY', payload: data });
  } catch (error) {
    dispatch({ type: 'ORDER_HISTORY_FAIL', payload: error.response.data });
  }
};

export const deleteOrder = orderId => async (dispatch) => {
  try {
    const userToken = authUtils.getUserToken();
    const response = await axiosInstance.delete(`orders/${orderId}`, { headers: { 'x-access-token': userToken } });
    return dispatch({ type: 'DELETE_ORDER', payload: { response, orderId } });
  } catch ({ response }) {
    return dispatch({ type: 'DELETE_ORDER_FAIL', payload: response.data });
  }
};
