import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.1.40.40:5000/api/v1',
  withCredentials: true,
});

export default API;
