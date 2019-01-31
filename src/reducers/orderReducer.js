const initialState = {
  response: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ORDER_HISTORY':
      return { ...state, response: action.payload };
    case 'ORDER_HISTORY_FAIL':
      return { ...state, response: action.payload };
    default:
      return state;
  }
};
