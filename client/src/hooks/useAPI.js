import axios from "axios";

const API_URL = "http://localhost:5000";

export const useApi = () => {
  const callApi = async (method, url, data = null) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token provided");
    }

    try {
      const res = await axios({
        method,
        url: API_URL + url,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  };

  return { callApi };
};
