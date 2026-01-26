import axios from "axios";
import { useState } from "react";

const API = axios.create({
  // Ensure this matches your backend URL exactly
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

      // 1. Pull the token inside the callApi function
      const token = localStorage.getItem("access_token");

      console.log(`Making ${method} request to: ${API.defaults.baseURL}${url}`);

      const res = await API({
        method,
        url,
        ...options,
        headers: {
          // 2. Attach the Authorization header dynamically
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        },
      });

      console.log("Response received:", res.data);
      return res;
    } catch (err) {
      console.error("API Error:", err);
      
      if (err.response?.headers['content-type']?.includes('text/html')) {
        setError("API endpoint not found. Please check your backend routes.");
      } else {
        // This will now catch the "Access denied" message from your middleware
        setError(err.response?.data?.message || "Something went wrong");
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};