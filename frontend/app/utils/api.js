
import axios from 'axios';

// Base URL configuration
const BASE_URL = process.env.NODE_ENV === 'production'
  ? `${process.env.PRODUCTION_SERVER}`
  : 'http://localhost:5000/api';

const apiRequest = async (endpoint, method = 'GET', data = null, token = null) => {
  try {
    const headers = token ? { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` 
    }: {}

    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      headers,
    });

    return response.data; // Return the response data
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling function
  }
};

export default apiRequest;
