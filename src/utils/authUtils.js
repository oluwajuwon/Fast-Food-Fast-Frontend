const tokenKey = 'token';
const userData = 'userData';

const saveUserToken = token => window.localStorage.setItem(tokenKey, token);
const getUserToken = () => window.localStorage.getItem(tokenKey);
const removeUserToken = () => window.localStorage.removeItem(tokenKey);

const saveUserData = userInfo => window.localStorage.setItem(userData, JSON.stringify(userInfo));
const getUserData = () => window.localStorage.getItem(userData);
const removeUserData = () => window.localStorage.removeItem(userData);

export default {
  saveUserToken,
  getUserToken,
  removeUserToken,
  saveUserData,
  getUserData,
  removeUserData,
};
