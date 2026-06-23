export interface Payment {
  id: string;
  orderId?: string;
  membershipSubscriptionId?: string;
  userId: string;
  paymentMethod: 'cod' | 'bank' | 'vnpay';
  amount: number;
  currency: string; // e.g. 'VND'
  status: 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled';
  transactionCode?: string;
  paymentGateway?: string;
  paidAt?: string;
  failedReason?: string;
  refundAmount?: number;
  refundedAt?: string;
  createdAt: string;
  updatedAt?: string;
}
