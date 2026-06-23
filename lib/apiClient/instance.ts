import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export type ApiErrorResponse = {
  message?: string;
  error?: string;
};

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
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
