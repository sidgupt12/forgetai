// lib/api/client.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Empty initial interceptor as placeholder
const initialInterceptor = apiClient.interceptors.request.use(config => config);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.error || 'An unexpected error occurred',
      status: error.response?.status || 500,
      data: error.response?.data || null,
    };
    
    console.error('API Error:', customError);
    return Promise.reject(customError);
  }
);

// Configure client with auth token dynamically
export const configureClient = (getToken) => {
    // Remove the initial interceptor
    apiClient.interceptors.request.eject(initialInterceptor);
    
    // Add new interceptor with getToken
    apiClient.interceptors.request.use(async (config) => {
      try {
        if (getToken) {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (error) {
        console.error('Error getting auth token', error);
      }
      return config;
    });
  };

export default apiClient;