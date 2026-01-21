import axios from "axios";
import { useState } from "react";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (method, url, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const res = await API({
        method,
        url,
        ...options,
      });

      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};
