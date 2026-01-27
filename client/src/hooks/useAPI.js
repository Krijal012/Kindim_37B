import { useState } from "react";
import { toast } from "react-toastify";

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

      // Handle 401 Unauthorized - Token expired or invalid
      if (res.status === 401) {
        const errorMessage = result.message || "Session expired";
        
        // Check if it's a token expiration or invalid token
        if (
          errorMessage.toLowerCase().includes("token expired") ||
          errorMessage.toLowerCase().includes("invalid token") ||
          errorMessage.toLowerCase().includes("no token")
        ) {
          // Clear authentication data
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userEmail");
          
          // Show notification
          toast.error("Your session has expired. Please login again.");
          
          // Redirect to login after a short delay
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
          
          throw new Error("Session expired");
        }
      }

      if (!res.ok) {
        throw new Error(result.message || "Request failed");
      }

      return result;
    } catch (err) {
      setError(err.message);
      
      // Don't show toast for session expired (already shown above)
      if (!err.message.includes("Session expired")) {
        // Optionally show toast for other errors
        // toast.error(err.message);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};