import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import foodReducer from './foodReducer';
import selectFoodReducer from './selectFoodReducer';


export default combineReducers({
  login: loginReducer,
  signup: signupReducer,
  food: foodReducer,
  cart: selectFoodReducer,
});
