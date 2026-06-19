import { api } from "@/lib/apiClient";
import type { Address, PaymentMethod, Product, User } from "@/lib/types";

export type UserPayload = Record<string, unknown>;

export const userServices = {
  getAll: () => api.get<User[]>("/users"),
  getById: (id: string | number) => api.get<User>(`/users/${id}`),
  create: (data: UserPayload) => api.post<User>("/users", data),
  update: (id: string | number, data: UserPayload) => api.put<User>(`/users/${id}`, data),
  updateMe: (data: Partial<User>) => api.put<User>("/users/me", data),
  getMyAddresses: () => api.get<Address[]>("/users/me/addresses"),
  addMyAddress: (data: Omit<Address, "id">) => api.post<Address[]>("/users/me/addresses", data),
  updateMyAddress: (id: string, data: Partial<Address>) =>
    api.put<Address[]>(`/users/me/addresses/${id}`, data),
  deleteMyAddress: (id: string) => api.delete<Address[]>(`/users/me/addresses/${id}`),
  getMyFavorites: () => api.get<Product[]>("/users/me/favorites"),
  addMyFavorite: (productId: string) => api.post<{ productId: string }>("/users/me/favorites", { productId }),
  deleteMyFavorite: (productId: string) =>
    api.delete<{ productId: string }>(`/users/me/favorites/${productId}`),
  getMyPaymentMethods: () => api.get<PaymentMethod[]>("/users/me/payment-methods"),
  addMyPaymentMethod: (data: Omit<PaymentMethod, "id">) =>
    api.post<PaymentMethod[]>("/users/me/payment-methods", data),
  deleteMyPaymentMethod: (id: string) => api.delete<PaymentMethod[]>(`/users/me/payment-methods/${id}`),
  delete: (id: string | number) => api.delete<{ id: string | number }>(`/users/${id}`),
};
