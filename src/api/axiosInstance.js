import axios from 'axios';

export default axios.create({
  baseURL: 'https://fast-foodfastapp.herokuapp.com/api/v1',
});
