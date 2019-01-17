import axiosInstance from '../api/axiosInstance';

export const login = userdata => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/login', userdata);
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
