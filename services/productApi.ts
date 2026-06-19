import { api } from "@/lib/apiClient";
import type { PaginatedResponse, Product, Review } from "@/lib/types";
import { unwrapList } from "./apiList";

export type ProductQuery = {
  categoryId?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest" | "priceAsc" | "priceDesc" | "rating" | "popular";
};

export const productServices = {
  getAll: async (params?: ProductQuery) =>
    unwrapList(await api.get<Product[] | PaginatedResponse<Product>>("/products", { params })),
  getPaginated: (params?: ProductQuery) => api.get<PaginatedResponse<Product>>("/products", { params }),
  getBySlug: (slug: string) => api.get<Product>(`/products/${slug}`),
  getByIds: (ids: string[]) =>
    ids.length ? api.get<Product[]>("/products/by-ids", { params: { ids: ids.join(",") } }) : Promise.resolve([]),
  getReviews: (productId: string) => api.get<Review[]>(`/products/${productId}/reviews`),
  createReview: (productId: string, data: { rating: number; comment?: string }) =>
    api.post<Review>(`/products/${productId}/reviews`, data),
};
