import { api } from "@/lib/apiClient";
import type { Notification, PaginatedResponse } from "@/lib/types";
import { unwrapList } from "./apiList";

export const notificationServices = {
  getMy: async () => unwrapList(await api.get<Notification[] | PaginatedResponse<Notification>>("/notifications/my")),
  getMyPaginated: (params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<Notification>>("/notifications/my", { params }),
  markRead: (id: string) => api.patch<Notification>(`/notifications/${id}/read`),
};
