import { api } from "@/lib/apiClient";
import type { Doctor, PaginatedResponse } from "@/lib/types";
import { unwrapList } from "./apiList";

export type DoctorQuery = {
  specialty?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: "rating" | "experience" | "newest";
};

export const doctorServices = {
  getAll: async (params?: DoctorQuery) =>
    unwrapList(await api.get<Doctor[] | PaginatedResponse<Doctor>>("/doctors", { params })),
  getPaginated: (params?: DoctorQuery) => api.get<PaginatedResponse<Doctor>>("/doctors", { params }),
  getById: (id: string) => api.get<Doctor>(`/doctors/${id}`),
};
