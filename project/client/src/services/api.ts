import axios from 'axios';
import { toast } from 'react-toastify';

// Base URL
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from storage
    const token = localStorage.getItem('token');
    
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    // Handle unauthorized errors (401)
    if (response && response.status === 401) {
      // If not on login page, show toast and redirect
      if (window.location.pathname !== '/login') {
        toast.error('Your session has expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    // Handle forbidden errors (403)
    if (response && response.status === 403) {
      toast.error('You do not have permission to perform this action');
    }
    
    // Handle server errors (500)
    if (response && response.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    
    // Show error message from response if available
    if (response && response.data && response.data.message) {
      toast.error(response.data.message);
    } else if (!response) {
      // Network error
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

export default api;