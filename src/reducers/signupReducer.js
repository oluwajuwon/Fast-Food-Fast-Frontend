export default (state = null, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return action.payload;
    case 'SIGNUP_FAIL':
      return action.payload;
    default:
      return state;
  }
};
