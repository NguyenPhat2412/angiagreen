import { api } from "@/lib/apiClient";
import type { ContentPage } from "@/interface/types";
import { mockPageContents } from "@/language/pageContent";

export const contentServices = {
  getPages: (params?: { group?: ContentPage["group"] }) =>
    api.get<ContentPage[]>("/content/pages", { params }),
  getPage: (key: string) => {
    if (mockPageContents[key]) {
      return Promise.resolve(mockPageContents[key]);
    }
    return api.get<ContentPage>(`/content/pages/${key}`);
  },
  getPolicies: () => api.get<ContentPage[]>("/content/policies"),
  getPolicy: (slug: string) => api.get<ContentPage>(`/content/policies/${slug}`),
  getSupportPage: (key: "faq" | "shopping-guide") =>
    api.get<ContentPage>(`/content/support/${key}`),
  getCareers: () => api.get<ContentPage>("/content/careers"),
};
