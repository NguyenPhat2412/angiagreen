import { api } from "@/lib/apiClient";
import type { Address, Order, PaginatedResponse } from "@/lib/types";
import { unwrapList } from "./apiList";

export type OrderPayload = {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: Address;
  paymentMethod: Order["paymentMethod"];
  note?: string;
  returnUrl?: string;
};

export type OrderCreateResponse = Order & {
  paymentUrl?: string;
};

export const orderServices = {
  getMy: async () => unwrapList(await api.get<Order[] | PaginatedResponse<Order>>("/orders/my")),
  getMyPaginated: (params?: { page?: number; limit?: number; status?: Order["status"] }) =>
    api.get<PaginatedResponse<Order>>("/orders/my", { params }),
  getById: (id: string) => api.get<Order>(`/orders/${id}`),
  create: (data: OrderPayload) => api.post<OrderCreateResponse>("/orders", data),
};
