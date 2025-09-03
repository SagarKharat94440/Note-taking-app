import axios from 'axios';

const API = axios.create({
 baseURL: 'https://note-taking-app-88gl.onrender.com/api'
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
