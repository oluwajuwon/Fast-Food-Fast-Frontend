import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://fast-foodfastapp.herokuapp.com/api/v1',
});
