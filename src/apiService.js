import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "./config";

const apiService = axios.create();

apiService.defaults.baseURL = API_BASE_URL;

console.log("API_BASE_URL", API_BASE_URL)

// Request interceptor for API calls
apiService.interceptors.request.use(
  async (config) => {
    const csrftoken = Cookies.get("csrftoken");
    axios.defaults.headers.common["Content-Type"] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.common["Accept"] = 'application/json';
    axios.defaults.headers.common["X-CSRFToken"] = csrftoken;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    var originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return apiService(originalRequest);
    }
    return Promise.reject(error);
  }
);

export { apiService };
