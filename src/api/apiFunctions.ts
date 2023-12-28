import axios from 'axios';
import API from './interceptors';

export const getCurrencies = () =>
  axios.get(
    `https://api.freecurrencyapi.com/v1/latest?apikey=9KUkGeviPGLrY5t7Bgu2zgRqexYQgOUMEow62lgG`,
  );
export const getAllBlogs = async () => {
  try {
    const response = await API.get('/blog/all');
    return response;
  } catch (error) {
    console.error('Error fetching these blogs:', error);
    throw error;
  }
};

export const getBlogById = async (id: string) => {
  try {
    const response = await API.get(`/blog/detail/${id}`);
    return response;
  } catch (error) {
    throw new Error(`Error fetching blog detail: ${error.message}`);
  }
};
export const login = async (data: {email: string; password: string}) => {
  try {
    const response = await API.post('/auth/login', data);
    return response;
  } catch (error) {
    throw new Error(`Error fetching login: ${error.message}`);
  }
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await API.post('/auth/register', data);
    return response;
  } catch (error) {
    throw new Error(`Error fetching register: ${error.message}`);
  }
};

export const postBlog = async (data: any) => {
  try {
    const response = await API.post('/blog/add', data);
    return response;
  } catch (error) {
    throw new Error(`Error fetching postBlog: ${error.message}`);
  }
};
