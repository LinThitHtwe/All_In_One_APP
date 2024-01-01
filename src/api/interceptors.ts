import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.1.12:5000/api/v1',
  withCredentials: true,
});

export default API;
