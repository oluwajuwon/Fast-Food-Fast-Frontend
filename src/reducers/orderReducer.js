const initialState = {
  response: null,
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ORDER_HISTORY':
      return { ...state, response: payload };
    case 'ORDER_HISTORY_FAIL':
      return { ...state, response: payload };
    case 'DELETE_ORDER':
      return {
        ...state,
        response: {
          ...state.response,
          myOrders:
            state.response.myOrders.filter(order => order.order_id !== payload.orderId),
        },
      };
    case 'DELETE_ORDER_FAIL':
      return { ...state, response: payload };
    default:
      return state;
  }
};
