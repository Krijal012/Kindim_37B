import { useCallback, useState } from "react";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (method, url, data = null) => {
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

      // Handle non-JSON responses
      let result;
      const contentType = res.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        result = await res.json();
      } else {
        const text = await res.text();
        result = { message: text || "Request completed" };
      }

      if (!res.ok) {
        const errorMessage = result.message || `Request failed with status ${res.status}`;
        setError(errorMessage);
        
        // Don't show toast here - let components handle it
        throw new Error(errorMessage);
      }

      return result;
    } catch (err) {
      const errorMessage = err.message || "Network error occurred";
      setError(errorMessage);
      
      // Don't show toast here - let components handle it
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { callApi, loading, error };
};