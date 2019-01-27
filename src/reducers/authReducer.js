const initialState = {
  isLoggedin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, isLoggedin: true, response: action.payload };
    case 'LOG_IN_FAIL':
      return { ...state, isLoggedin: false, response: action.payload };
    case 'SIGN_UP':
      return { ...state, isLoggedin: true, response: action.payload };
    case 'SIGNUP_FAIL':
      return { ...state, isLoggedin: false, response: action.payload };
    default:
      return state;
  }
};
