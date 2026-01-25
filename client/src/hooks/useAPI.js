import { useState } from "react";

const API_URL = "http://localhost:5000";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (method, url, data = null) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const headers = {};

      // DO NOT set Content-Type for FormData
      if (!(data instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(API_URL + url, {
        method,
        headers,
        body:
          data instanceof FormData
            ? data
            : data
            ? JSON.stringify(data)
            : null,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Request failed");
      }

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};
