import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  withCredentials: true,
});

/**
 * Request interceptor
 * - KHÔNG cần gắn Authorization
 * - Cookie tự gửi
 */
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * - Handle lỗi chung
 */
axiosInstance.interceptors.response.use(
  (response) => response.data, // chỉ trả data
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || "API Error";

    console.error("API Error:", message);

    // Token hết hạn / không hợp lệ
    if (status === 401 && typeof window !== "undefined") {
      // clear cookie phía client (optional)
      document.cookie = "auth_token=; Max-Age=0; path=/";
      document.cookie = "auth_role=; Max-Age=0; path=/";

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;