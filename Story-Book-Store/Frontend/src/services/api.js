import axios from 'axios';

// Create a base API instance
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    const user = localStorage.getItem('Users');
    if (user) {
      // If you implement JWT token authentication in the future
      // config.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    console.error('API Error:', error);

    // Get detailed error information
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
    const errorDetails = error.response?.data?.error || '';

    // Log detailed error information
    console.error('Error details:', {
      status: error.response?.status,
      message: errorMessage,
      details: errorDetails
    });

    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  signup: (userData) => api.post('/user/signup', userData),
  login: (credentials) => api.post('/user/login', credentials),
};

// Book API calls
export const bookAPI = {
  getAllBooks: () => api.get('/book'),
  getBooksByCategory: (category) => api.get(`/book?category=${category}`),
};

export default api;
