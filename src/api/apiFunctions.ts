import axios from 'axios';
import API from './interceptors';

export const getCurrencies = () => axios.get(``);
export const getAllBlogs = () => API.get('/blog/all');
export const getBlogById = async (id: string) => {
  try {
    const response = await API.get(`/blog/detail/${id}`);
    console.log('response---', response.data);
    return response;
  } catch (error) {
    throw new Error(`Error fetching blog: ${error.message}`);
  }
};
