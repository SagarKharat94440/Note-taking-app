import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api', 
});

API.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config; 
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

export default API;