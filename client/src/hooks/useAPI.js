import axios from "axios";
import { useState } from "react";

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (method, url, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      console.log(`Making ${method} request to: ${API.defaults.baseURL}${url}`);

      const res = await API({
        method,
        url,
        ...options,
      });

      console.log("Response received:", res.data);
      return res;
    } catch (err) {
      console.error("API Error:", err);
      console.error("Error response:", err.response);
      
      // If response is HTML (404 page), it means the route doesn't exist
      if (err.response?.headers['content-type']?.includes('text/html')) {
        setError("API endpoint not found. Please check your backend routes.");
      } else {
        setError(err.response?.data?.message || "Something went wrong");
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};