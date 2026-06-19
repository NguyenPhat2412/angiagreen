import { api } from "@/lib/apiClient";
import type { ContentPage } from "@/lib/types";

export const contentServices = {
  getPages: (params?: { group?: ContentPage["group"] }) =>
    api.get<ContentPage[]>("/content/pages", { params }),
  getPage: (key: string) => api.get<ContentPage>(`/content/pages/${key}`),
  getPolicies: () => api.get<ContentPage[]>("/content/policies"),
  getPolicy: (slug: string) => api.get<ContentPage>(`/content/policies/${slug}`),
  getSupportPage: (key: "faq" | "shopping-guide") =>
    api.get<ContentPage>(`/content/support/${key}`),
  getCareers: () => api.get<ContentPage>("/content/careers"),
};
