import { api } from "@/lib/apiClient";
import type { SsoProvider } from "@/lib/authSession";
import type { User } from "@/interface/types";

export type AuthResponse = {
  accessToken?: string;
  refreshToken?: string;
  user: User;
  token: string;
};

export const authServices = {
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>("/auth/login", data),
  register: (data: { name: string; email: string; phone: string; password: string }) =>
    api.post<AuthResponse>("/auth/register", data),
  loginWithSso: (data: { provider: SsoProvider; redirectUri?: string }) =>
    api.post<AuthResponse>("/auth/sso", data),
  logout: (data?: { refreshToken?: string }) =>
    api.post<{ message: string }>("/auth/logout", data ?? {}),
  refresh: (data: { refreshToken: string }) =>
    api.post<AuthResponse>("/auth/refresh", data),
  forgotPassword: (data: { email: string }) =>
    api.post<{ message: string; resendAfter?: number }>("/auth/forgot-password", data),
  resetPassword: (data: { email: string; otp: string; password: string }) =>
    api.post<{ message: string }>("/auth/reset-password", data),
  me: () => api.get<User>("/auth/me"),
};
