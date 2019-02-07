const initialState = {
  isLoggedin: false,
  user: null,
  response: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state, isLoggedin: true, user: action.payload, response: {},
      };
    case 'LOG_IN_FAIL':
      return { ...state, isLoggedin: false, response: action.payload };
    case 'SIGN_UP':
      return {
        ...state, isLoggedin: true, user: action.payload, response: '',
      };
    case 'SIGNUP_FAIL':
      return { ...state, isLoggedin: false, response: action.payload };
    case 'AUTHENTICATE_USER':
      return { ...state, isLoggedin: true, user: action.payload };
    case 'AUTHENTICATE_USER_FAIL':
      return { ...state, isLoggedin: false, response: action.payload };
    case 'LOGOUT':
      return { ...state, isLoggedin: false, user: null };
    default:
      return state;
  }
};
