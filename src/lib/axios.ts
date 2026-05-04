import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let queue: any[] = [];

const processQueue = () => {
  queue.forEach((cb) => cb());
  queue = [];
};

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
  async (error) => {
    const status = error.response?.status;

    const message =
      error.response?.data?.message || error.message || "API Error";

    console.error("API Error:", message);

    // Token hết hạn / không hợp lệ
    const originalRequest = error.config;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push(() => resolve(axiosInstance(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        await axios.post(
          "http://localhost:5000/auth/refresh",
          {},
          { withCredentials: true }
        );

        processQueue();
        return axiosInstance(originalRequest);
      } catch (err) {
        // clear cookie phía client (optional)
        document.cookie = "access_token=; Max-Age=0; path=/";
        document.cookie = "refresh_token=; Max-Age=0; path=/";
        document.cookie = "auth_role=; Max-Age=0; path=/";

        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;