import { api } from "@/lib/apiClient";
import type { Category } from "@/interface/types";
import { categories } from "@/language/data";
import { cachedRequest } from "./cache";

export const categoryServices = {
  getAll: () =>
    cachedRequest("categories:all", () => api.get<Category[]>("/categories"), categories),
};
