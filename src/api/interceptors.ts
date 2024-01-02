import axios from 'axios';
import {storage} from '../../MMKV';

const API = axios.create({
  baseURL: 'http://192.168.10.228:5000/api/v1',
  withCredentials: true,
});

const loginUser = storage.getString('loginuser');

API.interceptors.request.use(
  config => {
    if (loginUser) {
      try {
        const user = JSON.parse(loginUser);
        if (user.token) {
          config.headers['Authorization'] = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error('Error parsing loginUser JSON:', error);
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default API;
