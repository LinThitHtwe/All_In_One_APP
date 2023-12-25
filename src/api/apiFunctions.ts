import axios from 'axios';
import API from './interceptors';

export const getCurrencies = () => axios.get(``);
export const getAllBlogs = () => API.get('/blog/all');
