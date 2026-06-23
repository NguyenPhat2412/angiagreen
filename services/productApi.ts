import { api } from "@/lib/apiClient";
import type { PaginatedResponse, Product, Review } from "@/interface/types";
import { unwrapList } from "./apiList";
import { products } from "@/language/data";

export type ProductQuery = {
  categoryId?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest" | "priceAsc" | "priceDesc" | "rating" | "popular";
};

export const productServices = {
  getAll: async (params?: ProductQuery) =>
    api.get<Product[] | PaginatedResponse<Product>>("/products", { params })
      .then(unwrapList)
      .catch(() => {
        let list = products;
        if (params?.categoryId) {
          list = list.filter((p) => p.categoryId === params.categoryId);
        }
        if (params?.search) {
          const s = params.search.toLowerCase();
          list = list.filter((p) => p.name.vi.toLowerCase().includes(s) || p.name.en.toLowerCase().includes(s));
        }
        return list;
      }),
  getPaginated: (params?: ProductQuery) =>
    api.get<PaginatedResponse<Product>>("/products", { params })
      .catch(() => {
        let list = products;
        if (params?.categoryId) {
          list = list.filter((p) => p.categoryId === params.categoryId);
        }
        if (params?.search) {
          const s = params.search.toLowerCase();
          list = list.filter((p) => p.name.vi.toLowerCase().includes(s) || p.name.en.toLowerCase().includes(s));
        }
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const startIndex = (page - 1) * limit;
        const paginatedItems = list.slice(startIndex, startIndex + limit);
        return {
          items: paginatedItems,
          total: list.length,
          page,
          limit,
          pages: Math.ceil(list.length / limit),
        };
      }),
  getBySlug: (slug: string) =>
    api.get<Product>(`/products/${slug}`)
      .catch(() => {
        const prod = products.find((p) => p.id === slug);
        if (prod) return prod;
        throw new Error("Product not found");
      }),
  getByIds: (ids: string[]) =>
    ids.length
      ? api.get<Product[]>("/products/by-ids", { params: { ids: ids.join(",") } })
          .catch(() => products.filter((p) => ids.includes(p.id)))
      : Promise.resolve([]),
  getReviews: (productId: string) =>
    api.get<Review[]>(`/products/${productId}/reviews`)
      .catch(() => []),
  createReview: (productId: string, data: { rating: number; comment?: string }) =>
    api.post<Review>(`/products/${productId}/reviews`, data)
      .catch(() => ({
        id: "mock-review-" + Date.now(),
        productId,
        userId: "mock-user",
        userName: "Khách hàng",
        rating: data.rating,
        comment: data.comment || "",
        createdAt: new Date().toISOString(),
      })),
};
