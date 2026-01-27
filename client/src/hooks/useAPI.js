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

      // Handle 401 Unauthorized - Token expired or invalid
      if (res.status === 401) {
        const errorMessage = result.message || "Session expired";

        if (
          errorMessage.toLowerCase().includes("token expired") ||
          errorMessage.toLowerCase().includes("invalid token") ||
          errorMessage.toLowerCase().includes("no token")
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userEmail");

          toast.error("Your session has expired. Please login again.");

          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);

          throw new Error("Session expired");
        }
      }

      if (!res.ok) {
        const errorMessage = result.message || `Request failed with status ${res.status}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      return result;
    } catch (err) {
      const errorMessage = err.message || "Network error occurred";
      setError(errorMessage);

      // Avoid duplicate toast for session expiry; other errors can be toasted by caller if needed.
      if (!err.message?.includes("Session expired")) {
        // toast.error(errorMessage);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { callApi, loading, error };
};