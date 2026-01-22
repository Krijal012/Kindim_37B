import { useState } from 'react';
import axios from 'axios';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (method, url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        url: `http://localhost:5000${url}`,
        ...options
      };

      const response = await axios(config);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, callApi };
};