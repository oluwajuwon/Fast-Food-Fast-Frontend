
export default (state = null, action) => {
  switch (action.type) {
    case 'GET_MENU':
      return action.payload;
    case 'GET_MENU_FAIL':
      return action.payload;
    case 'TOTAL_CALCULATE_SAME':
      return { ...state, totalAmount: action.payload };
    case 'TOTAL_CALCULATE':
      return { ...state, totalAmount: action.payload };
    default:
      return state;
  }
};
