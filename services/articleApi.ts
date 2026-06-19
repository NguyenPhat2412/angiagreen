import { api } from "@/lib/apiClient";
import type { Article, PaginatedResponse } from "@/lib/types";
import { unwrapList } from "./apiList";

export type ArticleQuery = {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
};

export const articleServices = {
  getAll: async (params?: ArticleQuery) =>
    unwrapList(await api.get<Article[] | PaginatedResponse<Article>>("/articles", { params })),
  getPaginated: (params?: ArticleQuery) => api.get<PaginatedResponse<Article>>("/articles", { params }),
  getBySlug: (slug: string) => api.get<Article>(`/articles/${slug}`),
};
