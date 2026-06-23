import { api } from "@/lib/apiClient";
import type { Category } from "@/interface/types";
import { categories } from "@/language/data";

export const categoryServices = {
  getAll: () => api.get<Category[]>("/categories")
    .catch(() => categories),
};
