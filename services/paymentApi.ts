import { api } from "@/lib/apiClient";

export const paymentServices = {
  verifyVNPay: (params: Record<string, string | string[] | undefined>) =>
    api.post<{ success: boolean; type: "product" | "membership"; order: any }>(
      "/payment/vnpay-verify",
      params
    ),
};
