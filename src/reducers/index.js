import { combineReducers } from 'redux';
import authReducer from './authReducer';
import foodReducer from './foodReducer';
import selectFoodReducer from './selectFoodReducer';
import orderReducer from './orderReducer';


export default combineReducers({
  auth: authReducer,
  food: foodReducer,
  cart: selectFoodReducer,
  order: orderReducer,
});
