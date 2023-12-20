import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.1.30.119:3000',
  withCredentials: true,
});

export default API;
