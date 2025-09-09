import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - add token to headers
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('_____');
      if (token) {
        config.headers._____ = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Response interceptor - handle token refresh
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === _____ && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = localStorage.getItem('adminRefreshToken');
          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, {
            refreshToken
          });
          
          const { accessToken } = response.data.data;
          localStorage.setItem('adminRefreshToken', accessToken);
          
          originalRequest.headers.Authorization = `Bearer ${{refreshToken}}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('_____');
          localStorage.removeItem('_____');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );

export default api;

