import { api } from "@/lib/apiClient";
import type { MembershipLevel, MembershipPackage, MembershipOrder, Address, PaginatedResponse } from "@/interface/types";
import { unwrapList } from "./apiList";
import { membershipPackages } from "@/language/data";
import { cachedRequest } from "./cache";

export interface MembershipOrderPayload {
  packageId: string;
  paymentMethod: 'cod' | 'bank' | 'vnpay';
  shippingAddress?: Omit<Address, "id">;
  note?: string;
  returnUrl?: string;
}

export const membershipServices = {
  getLevels: () => api.get<MembershipLevel[]>("/membership-levels"),
  getPackages: () =>
    cachedRequest(
      "membership-packages:all",
      () => api.get<MembershipPackage[]>("/membership-packages"),
      membershipPackages,
    ),
  createOrder: (data: MembershipOrderPayload) =>
    api.post<{ order: MembershipOrder; paymentUrl?: string }>("/membership-orders", data),
  getMyOrders: async () =>
    unwrapList(await api.get<MembershipOrder[] | PaginatedResponse<MembershipOrder>>("/membership-orders/my")),
  getMyOrdersPaginated: (params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<MembershipOrder>>("/membership-orders/my", { params }),
  getOrderById: (id: string) => api.get<MembershipOrder>(`/membership-orders/${id}`),
};
