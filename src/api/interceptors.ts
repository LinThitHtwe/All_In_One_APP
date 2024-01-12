import axios from 'axios';
import {storage} from '../../MMKV';

const API = axios.create({
  baseURL: 'http://10.1.40.204:5000/api/v1',
  withCredentials: true,
});

API.interceptors.request.use(
  config => {
    const loginUser = storage.getString('loginuser');
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
