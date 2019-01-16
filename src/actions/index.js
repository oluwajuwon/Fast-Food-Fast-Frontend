import axiosInstance from '../api/axiosInstance';

const login = userdata => async (dispatch) => {
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

export default login;
