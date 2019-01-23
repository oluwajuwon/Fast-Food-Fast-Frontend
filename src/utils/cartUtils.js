const cartItemKey = 'food_items';

const addItemToCart = food => window.localStorage.setItem(cartItemKey, food);
const getCartItems = () => window.localStorage.getItem(cartItemKey);
const removeCartItems = () => window.localStorage.removeItem(cartItemKey);

export default {
  addItemToCart,
  getCartItems,
  removeCartItems,
};
