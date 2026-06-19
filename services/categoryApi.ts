import { api } from "@/lib/apiClient";
import type { Category } from "@/lib/types";

export const categoryServices = {
  getAll: () => api.get<Category[]>("/categories"),
};
