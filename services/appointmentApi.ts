import { api } from "@/lib/apiClient";
import type { Appointment, PaginatedResponse } from "@/lib/types";
import { unwrapList } from "./apiList";

export type AppointmentPayload = {
  doctorId?: string;
  date: string;
  time: string;
  type: Appointment["type"];
  topic?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  note?: string;
};

export const appointmentServices = {
  getMy: async () => unwrapList(await api.get<Appointment[] | PaginatedResponse<Appointment>>("/appointments/my")),
  getMyPaginated: (params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<Appointment>>("/appointments/my", { params }),
  create: (data: AppointmentPayload) => api.post<Appointment>("/appointments", data),
};
