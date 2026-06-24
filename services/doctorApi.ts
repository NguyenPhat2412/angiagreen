import { api } from "@/lib/apiClient";
import type { Doctor, PaginatedResponse } from "@/interface/types";
import { unwrapList } from "./apiList";
import { doctors } from "@/language/data";
import { cachedRequest } from "./cache";

export type DoctorQuery = {
  specialty?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: "rating" | "experience" | "newest";
};

export const doctorServices = {
  getAll: async (params?: DoctorQuery) => {
    const fetchDoctors = () => api.get<Doctor[] | PaginatedResponse<Doctor>>("/doctors", { params })
      .then(unwrapList)
      .catch(() => doctors);

    return params
      ? fetchDoctors()
      : cachedRequest("doctors:all", fetchDoctors, doctors);
  },
  getPaginated: (params?: DoctorQuery) =>
    api.get<PaginatedResponse<Doctor>>("/doctors", { params })
      .catch(() => ({
        items: doctors,
        total: doctors.length,
        page: params?.page || 1,
        limit: params?.limit || 10,
        pages: 1,
      })),
  getById: (id: string) =>
    api.get<Doctor>(`/doctors/${id}`)
      .catch(() => {
        const doc = doctors.find((d) => d.id === id);
        if (doc) return doc;
        throw new Error("Doctor not found");
      }),
};
