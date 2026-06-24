import { api } from "@/lib/apiClient";
import type { Article, PaginatedResponse } from "@/interface/types";
import { unwrapList } from "./apiList";
import { articles } from "@/language/data";
import { cachedRequest } from "./cache";

export type ArticleQuery = {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
};

export const articleServices = {
  getAll: async (params?: ArticleQuery) => {
    const fetchArticles = () => api.get<Article[] | PaginatedResponse<Article>>("/articles", { params })
      .then(unwrapList)
      .catch(() => articles);

    return params
      ? fetchArticles()
      : cachedRequest("articles:all", fetchArticles, articles);
  },
  getPaginated: (params?: ArticleQuery) =>
    api.get<PaginatedResponse<Article>>("/articles", { params })
      .catch(() => ({
        items: articles,
        total: articles.length,
        page: params?.page || 1,
        limit: params?.limit || 10,
        pages: 1,
      })),
  getBySlug: (slug: string) =>
    api.get<Article>(`/articles/${slug}`)
      .catch(() => {
        const art = articles.find((a) => a.id === slug || a.title.vi === slug);
        if (art) return art;
        throw new Error("Article not found");
      }),
};
