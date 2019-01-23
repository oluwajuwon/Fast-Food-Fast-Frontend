
const initialState = {
  cartCount: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_MENU':
      return { ...state, cartCount: state.cartCount + 1 };
    case 'CART_COUNT':
      return { ...state, cartCount: action.payload };
    default:
      return state;
  }
};
