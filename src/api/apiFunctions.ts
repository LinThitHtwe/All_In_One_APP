import axios from 'axios';
import API from './interceptors';

export const getCurrencies = () =>
  axios.get(
    `https://api.freecurrencyapi.com/v1/latest?apikey=9KUkGeviPGLrY5t7Bgu2zgRqexYQgOUMEow62lgG`,
  );
export const getAllBlogs = async page => {
  try {
    const response = await API.get(`/blog/all?page=${page}`);
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

export const getLatestBlog = async () => {
  try {
    const response = await API.get(`/blog/latest/`);
    return response;
  } catch (error) {
    throw new Error(`Error fetching blog detail: ${error.message}`);
  }
};
export const login = async (data: {email: string; password: string}) => {
  try {
    const response = await API.post('/auth/login', data);
    return {data: response};
  } catch (error) {
    return {error: 'Login Failed. Try Again'};
  }
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await API.post('/auth/register', data);
    return {data: response};
  } catch (error) {
    return {error: error};
  }
};

export const postBlog = async (data: any) => {
  try {
    const response = await API.post('/blog/add', data);
    return {data: response.data};
  } catch (error) {
    return {error: error.message};
  }
};

export const updateBlog = async (blogId: string, data) => {
  try {
    const response = await API.put(`/blog/update/${blogId}`, data);
    return {data: response.data};
  } catch (error) {
    return {error: error.message};
  }
};

export const getCurrentWeather = async (city: string) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=c07ae622495c4c009c940056232712&q=${city}`,
    );
    return {data: response};
  } catch (error) {
    return {error: error.message};
  }
};
