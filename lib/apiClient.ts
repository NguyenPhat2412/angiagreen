import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach browser token automatically when requests run on the client.
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Normalize successful responses and centralize server error messages.
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiErrorResponse>) => {
    const serverMessage =
      error.response?.data?.message || error.response?.data?.error;

    return Promise.reject(
      new Error(serverMessage || error.message || "Request failed")
    );
  }
);

const client = <T>(config: AxiosRequestConfig): Promise<T> =>
  apiClient.request<T, T>(config);

export const api = {
  get: <T>(endpoint: string, config?: AxiosRequestConfig) =>
    client<T>({ ...config, method: "GET", url: endpoint }),

  post: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) =>
    client<T>({ ...config, method: "POST", url: endpoint, data }),

  put: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) =>
    client<T>({ ...config, method: "PUT", url: endpoint, data }),

  patch: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) =>
    client<T>({ ...config, method: "PATCH", url: endpoint, data }),

  delete: <T>(endpoint: string, config?: AxiosRequestConfig) =>
    client<T>({ ...config, method: "DELETE", url: endpoint }),
};

export default api;
