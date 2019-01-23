import axiosInstance from '../api/axiosInstance';
import authUtils from '../utils/authUtils';
import cartUtils from '../utils/cartUtils';

export const login = userdata => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/login', userdata);
    authUtils.saveUserToken(response.data.userToken);
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

export const signup = userdata => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/signup', userdata);
    authUtils.saveUserToken(response.data.userToken);
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
