import { api } from "@/lib/apiClient";
import type { User } from "@/lib/types";

export type AuthResponse = {
  user: User;
  token: string;
};

export const authServices = {
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>("/auth/login", data),
  register: (data: { name: string; email: string; phone: string; password: string }) =>
    api.post<AuthResponse>("/auth/register", data),
  forgotPassword: (data: { email: string }) =>
    api.post<{ message: string; resendAfter?: number }>("/auth/forgot-password", data),
  resetPassword: (data: { email: string; otp: string; password: string }) =>
    api.post<{ message: string }>("/auth/reset-password", data),
  me: () => api.get<User>("/auth/me"),
};
